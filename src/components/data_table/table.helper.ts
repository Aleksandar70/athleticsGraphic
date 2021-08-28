import type {
  HeaderField,
  RawData,
  TableData,
  Headers,
} from "../../../global/types";
import { getCompetitorsForEvent } from "../../api/competitor.api";
import { getEventData } from "../../api/event.api";
import { isNumeric } from "../../utils/string.utils";

export const hideColumn = (field: HeaderField, data: TableData): TableData => {
  data.forEach((record) => {
    const rowData = record.find((data) => data.id == field.value);
    rowData.show = field.show;
  });
  return data;
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
): Promise<unknown[]> => {
  const eventData = await getEventData(eventId);
  const competitorData = await getCompetitorsForEvent(eventId);

  const data: unknown[] = [];

  const units = eventData.units;

  for (const unit of units) {
    const _resultBibs = unit.results.map((result) => result.bib);
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
            competitor[trial.height] =
              competitor[trial.height]?.concat(trial.result) ?? trial.result;
          }
        }
      }
    }

    if (units.length === 1) return _competitors;
    const _data = { heatName: unit.heatName, competitors: _competitors };
    data.push(_data);
  }

  return data;
};

export const getTableData = (
  rawData: RawData,
  defaultColumns: string[]
): TableData => {
  if (!rawData?.length) return [];

  const links = getFieldLinks(rawData);
  const tableData = rawData?.map((row) => {
    return Object.entries(row).map(([key, value]) => {
      if (!defaultColumns.includes(key) && isNumeric(key)) {
        defaultColumns = [...defaultColumns, key];
      }

      console.log("defaultColumns-> ", defaultColumns);
      return {
        value: value,
        stringValue: value.toString(),
        show: defaultColumns.includes(key),
        changed: false,
        link: links?.get(value.toString()),
        id: key,
      };
    });
  });
  return tableData;
};

export const getHeaderData = (
  rawData: RawData,
  defaultColumns: string[]
): Headers => {
  if (!rawData?.length) return [];

  const tableColumns: Headers = Object.keys(rawData[0]).map((data) => {
    if (!defaultColumns.includes(data) && isNumeric(data)) {
      defaultColumns = [...defaultColumns, data];
    }
    return {
      value: data,
      show: defaultColumns.includes(data),
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
