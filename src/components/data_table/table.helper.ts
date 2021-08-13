import type {
  FieldData,
  HeaderData,
  RawData,
  TableData,
} from "../../../global/types";

export const hideColumn = (field: FieldData, data: TableData): TableData => {
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

export const getTableData = (
  rawData: RawData,
  defaultColumns: string[]
): TableData => {
  if (!rawData?.length) return [];

  const links = getFieldLinks(rawData);
  const tableData = rawData?.map((row) => {
    return Object.entries(row).map(([key, value]) => ({
      value: value.toString(),
      show: defaultColumns.includes(key),
      link: links?.get(value.toString()),
      id: key,
    }));
  });
  console.log("rows -> ", tableData);
  return tableData;
};

export const getHeaderData = (
  rawData: RawData,
  defaultColumns: string[]
): HeaderData => {
  if (!rawData?.length) return [];

  const tableColumns = Object.keys(rawData[0]).map((data) => ({
    value: data,
    show: defaultColumns.includes(data),
  }));
  return tableColumns;
};

export const getUpdatedTable = (tableData, rowData) => {
  const keys = Object.keys(tableData[0]);
  const updatedValues = rowData.map((row) => row.map((field) => field.value));

  const updatedTable = updatedValues.map((values) =>
    Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]))
  );
  return updatedTable;
};
