import type { ICompetitor, IHeatEventData } from "../../../global/interfaces";
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
  eventColumnsUI,
  eventCompetitorsColumnsUI,
  uneditableFields,
} from "../../../global/defaults";
import {
  competitors,
  currentCompetitionData,
  currentEventData,
  currentEventId,
  lockedColumns,
  selectedParticipant,
  visibleColumns,
} from "../../stores/table.store";
import { get } from "svelte/store";
import { isNumeric } from "../../utils/string.utils";
import { getOTCompetitionData } from "../../../backend/src/api/opentrack.api";
import { getRelayTeamsForEvent } from "../../api/relayTeams.api";

export const getDefaultColumns = (): string[] => {
  return get(currentEventId) === "events"
    ? defaultEventColumns
    : defaultEventCompetitorsColumns;
};

export const getColumnsForDisplay = (): string[] => {
  return get(currentEventId) === "events"
    ? eventColumnsUI
    : eventCompetitorsColumnsUI;
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
  const eventData = await getEventData(eventId);
  const { competitionData } = await getOTCompetitionData();
  const relayTeams = await getRelayTeamsForEvent(eventId);

  currentEventData.set(eventData);
  currentCompetitionData.set(competitionData);

  const competitorData = await getCompetitorsForEvent(eventId);
  competitors.set(competitorData);

  const data: IHeatEventData[] = [];
  const units = eventData.units;
  console.log("competitorData ", competitorData);

  for (const unit of units) {
    const _results = unit.results;
    const _resultBibs = _results.map((result) => result.bib);
    let _competitors = competitorData.filter((competitor) =>
      _resultBibs.includes(competitor.competitorId)
    );
    if (_competitors.length == 0) {
      let runners = [];
      for (const relayTeam of Object.values(relayTeams)) {
        _competitors = competitorData.filter((competitor) =>
          relayTeam?.runners.includes(competitor.competitorId)
        );
        if (_competitors.length !== 0) {
          runners.push(..._competitors);
        }
      }
      _competitors = runners;
      console.log("_competitors ", _competitors);
    }

    const _trials = unit.trials;
    for (const competitor of _competitors) {
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

      for (const trial of _trials) {
        if (trial.bib === competitor.competitorId) {
          if (unit.rounds) {
            competitor[trial.round] = trial.result;
          } else if (unit.heights.length > 0) {
            competitor[trial.height] = trial.result;
          }
        }
      }

      competitor["result"] = _results.find(
        (result) => result.bib === competitor.competitorId
      )?.performance;
    }

    if (units.length === 1) return _competitors;
    const _data = { heatName: unit.heatName, competitors: _competitors };
    data.push(_data);
  }

  return data;
};

export const getCompetitorIdFromRow = (row: TableRow): string =>
  row.find((field) => field.id === "competitorId")?.stringValue ?? "events";

export const isRowSelected = (row: TableRow): boolean =>
  get(currentEventId) !== "events" &&
  getCompetitorIdFromRow(get(selectedParticipant)) ===
    getCompetitorIdFromRow(row);

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

export const getTableData = (rawData: RawData): TableData => {
  if (!rawData?.length) return [];
  const links = getFieldLinks(rawData);
  const tableData = rawData?.map((row) => {
    return Object.entries(row).map(([key, value]) => {
      return {
        value: value,
        stringValue: value?.toString(),
        changed: false,
        link: links?.get(value?.toString()),
        height: isHeight(key),
        round: isRound(key),
        id: key,
      };
    });
  });

  return filterRowData(tableData);
};

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
              _row.id === "competitorId"
          )
          .map((field) => {
            const parsedValue =
              field.value instanceof Number
                ? Number(field.stringValue)
                : field.stringValue;
            field.value = parsedValue;
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

export const filterRowData = (tableData: TableData): TableData => {
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
  return tableData;
};
