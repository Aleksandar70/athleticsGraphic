import type { RawData, TableData, Headers } from "../../../global/types";
import {
  defaultEventColumns,
  defaultEventCompetitorsColumns,
} from "../../../global/defaults";
import { currentEventId, visibleColumns } from "../../config.store";
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

export const getTableData = (rawData: RawData): TableData => {
  if (!rawData?.length) return [];
  const _visibleColumns = get(visibleColumns)[get(currentEventId)];
  const links = getFieldLinks(rawData);
  const tableData = rawData?.map((row) => {
    return Object.entries(row).map(([key, value]) => ({
      value: value,
      stringValue: value.toString(),
      show: _visibleColumns.showAll || _visibleColumns?.columns?.includes(key),
      changed: false,
      link: links?.get(value.toString()),
      id: key,
    }));
  });
  return tableData;
};

export const getHeaderData = (rawData: RawData): Headers => {
  if (!rawData?.length) return [];
  const _visibleColumns = get(visibleColumns)[get(currentEventId)];
  const tableColumns: Headers = Object.keys(rawData[0]).map((data) => ({
    value: data,
    show: _visibleColumns.showAll || _visibleColumns?.columns?.includes(data),
  }));
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
