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
import { isNumeric } from "../../utils/string.utils";
import {
  defaultEventColumns,
  defaultEventCompetitorsColumns,
} from "../../../global/defaults";
import {
  currentEventId,
  selectedParticipant,
  visibleColumns,
} from "../../stores/table.store";
import { get } from "svelte/store";

export const getDefaultColumns = (): string[] => {
  return get(currentEventId) === "events"
    ? defaultEventColumns
    : defaultEventCompetitorsColumns;
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
  const competitorData = await getCompetitorsForEvent(eventId);

  const data: IHeatEventData[] = [];

  const units = eventData.units;

  for (const unit of units) {
    const _results = unit.results;
    const _resultBibs = _results.map((result) => result.bib);
    const _competitors = competitorData.filter((competitor) =>
      _resultBibs.includes(competitor.competitorId)
    );
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
  get(selectedParticipant)?.["id"] === getCompetitorIdFromRow(row);

export const getTableData = (rawData: RawData): TableData => {
  if (!rawData?.length) return [];
  const links = getFieldLinks(rawData);
  const tableData = rawData?.map((row) => {
    return Object.entries(row).map(([key, value]) => {
      return {
        value: value,
        stringValue: value.toString(),
        changed: false,
        link: links?.get(value.toString()),
        height: isHeight(key),
        round: isRound(key),
        id: key,
      };
    });
  });
  return tableData;
};

export const getHeaderData = (rawData: RawData): Headers => {
  if (!rawData?.length) return [];

  const tableColumns: Headers = Object.keys(rawData[0]).map((data) => {
    return {
      value: data,
    };
  });
  return tableColumns;
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
