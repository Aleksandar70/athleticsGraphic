import type {
  ICompetitor,
  IHeatEventData,
  IRelayTeam,
  IUnit,
} from "../../../global/interfaces";
import type {
  RawData,
  TableData,
  Headers,
  TableRow,
} from "../../../global/types";
import { getCompetitorsForEvent } from "../../api/competitor.api";
import { getEventData } from "../../api/event.api";
import { isHeight, isRound } from "../../utils/event.utils";
import {
  defaultEventColumns,
  defaultEventCompetitorsColumns,
  defaultEventRelayTeamsColumns,
  eventColumnsUI,
  eventCompetitorsColumnsUI,
  eventRelayTeamsColumnsUI,
  uneditableFields,
} from "../../../global/defaults";
import {
  competitors,
  currentCompetitionData,
  currentEventData,
  currentEventId,
  currentHeatName,
  isRelayTeamEvent,
  lockedColumns,
  selectedParticipant,
  visibleColumns,
} from "../../stores/table.store";
import { get } from "svelte/store";
import { isNumeric } from "../../utils/string.utils";
import { getOTCompetitionData } from "../../../backend/src/api/opentrack.api";
import { getRelayTeamsForEvent } from "../../api/relayTeams.api";

export const getDefaultColumns = (): string[] => {
  const singleEventColumns = get(isRelayTeamEvent)
    ? defaultEventRelayTeamsColumns
    : defaultEventCompetitorsColumns;
  return get(currentEventId) === "events"
    ? defaultEventColumns
    : singleEventColumns;
};

export const getColumnsForDisplay = (): string[] => {
  const singleEventColumns = get(isRelayTeamEvent)
    ? eventRelayTeamsColumnsUI
    : eventCompetitorsColumnsUI;
  return get(currentEventId) === "events" ? eventColumnsUI : singleEventColumns;
};

export const getCurrentColumns = (): string => {
  return visibleColumns[get(currentEventId)];
};

export const getFieldLinks = (rows: RawData): Map<string, string> => {
  const fielsLinks = new Map<string, string>();
  rows?.forEach((data: Record<string, string>) => {
    fielsLinks.set(data.name, data.eventId);
  });
  return fielsLinks;
};

export const getCompetitorResultsData = async (
  eventId: string
): Promise<IHeatEventData[] | ICompetitor[]> => {
  const { competitionData } = await getOTCompetitionData();

  const eventData = await getEventData(eventId);
  const competitorData = await getCompetitorsForEvent(eventId);
  const relayTeamsData = await getRelayTeamsForEvent(eventId);

  const isTeamEvent = !!relayTeamsData.length;

  currentEventId.set(eventData?.eventId);
  isRelayTeamEvent.set(isTeamEvent);

  currentEventData.set(eventData);
  currentCompetitionData.set(competitionData);
  competitors.set(competitorData);

  let data: IHeatEventData[] = [];
  const units = eventData.units;

  for (const unit of units) {
    const tableData = isTeamEvent
      ? getRelayTeamsForUnit(relayTeamsData, unit)
      : getCompetitorsForUnit(unit);

    if (!isTeamEvent) {
      addRoundsOrHeightsToCompetitorsForUnit(tableData as ICompetitor[], unit);
      populateTrialsToCompetitorsForUnit(tableData as ICompetitor[], unit);
    }
    populateResultsAndPlacesOfTableDataForUnit(tableData, unit);
    if (units.length === 1) return tableData as ICompetitor[];

    const heatData: IHeatEventData = isTeamEvent
      ? { heatName: unit.heatName, relayTeams: tableData as IRelayTeam[] }
      : {
          heatName: unit.heatName,
          competitors: tableData as ICompetitor[],
        };

    data = [...data, heatData];
  }

  return data;
};

const getRelayTeamsForUnit = (
  relayTeamsData: IRelayTeam[],
  unit: IUnit
): IRelayTeam[] => {
  const resultBibs = unit.results.map((result) => result.bib);
  const unitRelayTeams = relayTeamsData.filter((relayTeam) =>
    resultBibs.includes(relayTeam.relayTeamId)
  );
  for (const unitRelayTeam of unitRelayTeams) {
    unitRelayTeam.runners = unitRelayTeam.runners.map((runnerId) =>
      get(competitors).find(
        (competitor) => competitor.competitorId === runnerId
      )
    );
  }
  return unitRelayTeams;
};

const getCompetitorsForUnit = (unit: IUnit): ICompetitor[] => {
  const resultBibs = unit?.results?.map((result) => result?.bib);
  return get(competitors).filter((competitor) =>
    resultBibs.includes(competitor.competitorId)
  );
};

const addRoundsOrHeightsToCompetitorsForUnit = (
  competitors: ICompetitor[],
  unit: IUnit
): void => {
  for (const competitor of competitors) {
    if (unit.rounds) {
      let round = 1;
      while (round <= unit.rounds) {
        competitor[round++] = "";
      }
    } else if (unit.heights.length > 0) {
      const heights = unit.heights;
      for (const height of heights) {
        competitor[height] = "";
      }
    }
  }
};

const populateTrialsToCompetitorsForUnit = (
  competitors: ICompetitor[],
  unit: IUnit
): void => {
  const _trials = unit.trials;
  for (const competitor of competitors) {
    for (const trial of _trials) {
      if (trial.bib === competitor.competitorId) {
        if (unit.rounds) {
          competitor[trial.round] = trial.result;
        } else if (unit.heights.length > 0) {
          competitor[trial.height] = trial.result;
        }
      }
    }
  }
};

const populateResultsAndPlacesOfTableDataForUnit = (
  tableData: ICompetitor[] | IRelayTeam[],
  unit: IUnit
) => {
  if ("competitorId" in tableData?.[0]) {
    for (const data of tableData as ICompetitor[]) {
      const result = unit.results.find(
        (result) =>
          result.bib === data.competitorId &&
          (result.heatName === unit.heatName || result.heatName === "single")
      );

      data["result"] = {
        ...(data["result"] ?? {}),
        [result?.heatName ?? "single"]: result?.performance ?? "",
      };
      data["place"] = {
        ...(data["place"] ?? {}),
        [result?.heatName ?? "single"]: result?.place ?? "",
      };
    }
  } else {
    for (const data of tableData as IRelayTeam[]) {
      const result = unit.results.find(
        (result) =>
          result.bib === data.relayTeamId &&
          (result.heatName === unit.heatName || result.heatName === "single")
      );
      data["result"] = {
        ...(data["result"] ?? {}),
        [result?.heatName ?? "single"]: result?.performance ?? "",
      };
      data["place"] = {
        ...(data["place"] ?? {}),
        [result?.heatName ?? "single"]: result?.place ?? "",
      };
    }
  }
  return tableData;
};

export const getCompetitorIdFromRow = (row: TableRow): string => {
  const id = get(isRelayTeamEvent) ? "teamId" : "competitorId";
  return row.find((field) => field.id === id)?.stringValue ?? "events";
};

export const isRowSelected = (row: TableRow): boolean => {
  const temp =
    get(currentEventId) !== "events" &&
    getCompetitorIdFromRow(get(selectedParticipant)) ===
      getCompetitorIdFromRow(row);
  return temp;
};

export const setLock = (value: string): string =>
  get(lockedColumns)?.[get(currentEventId)]?.includes(value) ? " 🔒" : "";

export const getEditableColumns = (
  showAll: boolean,
  visibleColumns: string[]
): string[] =>
  showAll
    ? [
        ...getColumnsForDisplay().filter(
          (value: string) => !uneditableFields.includes(value)
        ),
        ...visibleColumns.filter((value: string) => isNumeric(value)),
      ]
    : [
        ...getColumnsForDisplay().filter(
          (value: string) =>
            !uneditableFields.includes(value) && visibleColumns.includes(value)
        ),
        ...visibleColumns.filter((value: string) => isNumeric(value)),
      ];

export const getTableData = (rawData: RawData, heatName: string): TableData => {
  if (!rawData?.length) return [];
  const links = getFieldLinks(rawData);
  const tableData = rawData?.map((row) => {
    return Object.entries(row).map(([key, value]) => {
      return {
        value: value,
        stringValue:
          key === "runners"
            ? getRunnersNames(value as ICompetitor[])
            : value?.toString(),
        changed: false,
        link: links?.get(value?.toString()),
        height: isHeight(key),
        round: isRound(key),
        id: key,
      };
    });
  });

  return filterAndSortRowData(tableData, heatName);
};

const getRunnersNames = (runners: ICompetitor[]): string =>
  runners
    ?.map((runner) => `${runner?.firstName} ${runner?.lastName}`)
    .join(", ");

export const getHeaderData = (rawData: RawData): Headers => {
  if (!rawData?.length) return [];

  const tableColumns: Headers = Object.keys(rawData[0]).map((data) => {
    return {
      value: data,
    };
  });
  return filterHeaderData(tableColumns);
};

export const search = (
  searchValue: string,
  searchKey: string,
  tableData: TableData
): TableData => {
  return tableData.filter((row) =>
    (
      row.find(
        (field) =>
          (field.id as string).toLowerCase() === searchKey.toLowerCase()
      ).value as string
    ).includes(searchValue.toLowerCase())
  );
};

export const setUnchanged = (tableData: TableData): TableData => {
  tableData.forEach((tableRow) =>
    tableRow.forEach((row) => (row.changed = false))
  );

  return tableData;
};

export const checkIfChanged = (tableData: TableData): boolean => {
  const changedFields = tableData.filter((tableRow) =>
    tableRow.find((row) => row.changed === true)
  );
  return changedFields?.length > 0;
};

export const updatedTableValues = (tableData: TableData): RawData => {
  return tableData
    .map((row) =>
      Object.fromEntries(
        row
          .filter(
            (_row) =>
              _row.changed ||
              _row.id === "eventId" ||
              _row.id === "competitorId" ||
              _row.id === "teamId"
          )
          .map((field) => {
            let parsedValue: number | string;
            const result = field?.value?.[get(currentHeatName)];
            if (result !== undefined) {
              parsedValue = result instanceof Number ? Number(result) : result;
            } else {
              parsedValue =
                field.value instanceof Number
                  ? Number(field.stringValue)
                  : field.stringValue;
              field.value = parsedValue;
            }
            return [field.id, parsedValue];
          })
      )
    )
    .filter((changedFields) => Object.keys(changedFields).length > 1);
};

export const filterHeaderData = (headers: Headers): Headers => {
  const columnsForModal = getColumnsForDisplay();
  const headersCopy = [...headers];
  headersCopy.forEach((headerData) => {
    if (
      !columnsForModal.includes(headerData.value) &&
      !isNumeric(headerData.value)
    ) {
      const index = headers.indexOf(headerData, 0);
      headers.splice(index, 1);
    }
    if (isNumeric(headerData.value)) {
      headers.push(headers.splice(headers.indexOf(headerData), 1)[0]);
    }
  });

  return headers;
};

const filterAndSortRowData = (
  tableData: TableData,
  heatName: string
): TableData => {
  const columnsForModal = getColumnsForDisplay();
  tableData.forEach((rowData) => {
    const rowDataCopy = [...rowData];
    rowDataCopy.forEach((row) => {
      if (!columnsForModal.includes(row.id) && !isNumeric(row.id)) {
        const index = rowData.indexOf(row, 0);
        rowData.splice(index, 1);
      }
      if (isNumeric(row.id)) {
        rowData.push(rowData.splice(rowData.indexOf(row), 1)[0]);
      }
    });
  });
  if (Object.keys(get(currentEventData)).length !== 0) {
    sortTableDataByPlace(tableData, heatName);
  }
  return tableData;
};

const sortTableDataByPlace = (tableData: TableData, heatName: string): void => {
  tableData.sort((n1: TableRow, n2: TableRow) => {
    let place1 = n1.find((el) => el.id === "place")?.value[heatName];
    let place2 = n2.find((el) => el.id === "place")?.value[heatName];
    if (place1 == "") {
      place1 = Number.MAX_SAFE_INTEGER;
    }
    if (place2 == "") {
      place2 = Number.MAX_SAFE_INTEGER;
    }
    if (place1 > place2) {
      return 1;
    }
    if (place1 < place2) {
      return -1;
    }
    return 0;
  });
};
