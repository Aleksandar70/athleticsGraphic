import type {
  HeaderField,
  RawData,
  TableData,
  Headers,
} from "../../../global/types";
import { defaultEventColumns } from "../../../global/defaults";

export const hideColumn = (field: HeaderField, data: TableData): TableData => {
  data.forEach((record) => {
    const rowData = record.find((data) => data.id == field.value);
    rowData.show = field.show;
  });
  return data;
};

export const showAllColumns = (
  showAll: boolean,
  data: TableData
): TableData => {
  data.forEach((tableRow) => {
    tableRow.forEach((row) => (row.show = showAll));
  });
  return data;
};

export const toggleAllHeaders = (
  showAll: boolean,
  headers: Headers
): Headers => {
  headers.forEach((headerData) => {
    headerData.show = showAll;
  });
  return headers;
};

export const resetToDefaultColumns = (
  isDefaultChecked: boolean,
  data: TableData
): TableData => {
  data.forEach((tableRow) => {
    tableRow.find((data) => {
      if (defaultEventColumns.includes(data.id)) {
        data.show = isDefaultChecked;
      } else {
        data.show = !isDefaultChecked;
      }
    });
  });
  return data;
};

export const toggleDefaultHeader = (
  isDefaultChecked: boolean,
  headers: Headers
): Headers => {
  headers.forEach((headerData) => {
    if (defaultEventColumns.includes(headerData.value)) {
      headerData.show = isDefaultChecked;
    } else {
      headerData.show = !isDefaultChecked;
    }
  });
  return headers;
};

export const getFieldLinks = (rows: RawData): Map<string, string> => {
  const fielsLinks = new Map<string, string>();
  rows?.forEach((data: Record<string, string>) => {
    fielsLinks.set(data.name, data.eventId);
  });
  return fielsLinks;
};

export const getTableData = (
  rawData: RawData,
  defaultColumns: string[]
): TableData => {
  if (!rawData?.length) return [];

  const links = getFieldLinks(rawData);
  const tableData = rawData?.map((row) => {
    return Object.entries(row).map(([key, value]) => ({
      value: value,
      stringValue: value.toString(),
      show: defaultColumns.includes(key),
      changed: false,
      link: links?.get(value.toString()),
      id: key,
    }));
  });
  return tableData;
};

export const getHeaderData = (
  rawData: RawData,
  defaultColumns: string[]
): Headers => {
  if (!rawData?.length) return [];

  const tableColumns: Headers = Object.keys(rawData[0]).map((data) => ({
    value: data,
    show: defaultColumns.includes(data),
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
