import type { FieldData, HeaderData, RawData, TableData } from "../../types";

export const parseTableData = (data: RawData): unknown[][] =>
  data?.map((d) => Object.keys(d).map((key) => [d[key]]));

export const parseHeaderData = (data: HeaderData): string[] =>
  Object.keys(data?.[0])?.map((val: string) =>
    val.replaceAll("_", " ").toUpperCase()
  );

export const hideColumn = (field: FieldData, data: TableData): TableData => {
  data.forEach((record) => {
    const rec = record.find((element) => element.id === field.id);
    rec.show = !rec.show;
  });
  return data;
};

export const getEmptyColumns = (rows: TableData): Map<number, number> => {
  const emptyColumns = new Map<number, number>();
  rows.forEach((row) => {
    row.forEach((val, i) => {
      if (val.toString() === "") {
        if (emptyColumns.has(i)) {
          emptyColumns.set(i, emptyColumns.get(i) + 1);
        } else {
          emptyColumns.set(i, 1);
        }
      }
    });
  });
  return emptyColumns;
};

export const getTableData = (
  rows: string[][],
  emptyColumns: Map<number, number>
): TableData => {
  const tableData = rows.map((row) => {
    return row.map((field, idx) => ({
      value: field.toString(),
      show: setFiledVisibility(emptyColumns, idx, rows.length),
      id: idx,
    }));
  });
  return tableData;
};

export const getHeaderData = (
  fields: string[],
  emptyColumns: Map<number, number>,
  dataSize: number
): HeaderData => {
  const tableColumns = fields.map((data, idx) => ({
    id: idx,
    value: data,
    show: setFiledVisibility(emptyColumns, idx, dataSize),
  }));
  return tableColumns;
};

const setFiledVisibility = (
  emptyColumns: Map<number, number>,
  idx: number,
  limit: number
): boolean => {
  if (!emptyColumns.has(idx)) {
    return true;
  }

  return emptyColumns.get(idx) < limit;
};

declare global {
  interface ObjectConstructor {
    fromEntries(xs: [string | number | symbol, any][]): object;
  }
}

export const getUpdatedTable = (tableData, rowData) => {
  const keys = Object.keys(tableData[0]);
  const updatedValues = rowData.map((row) => row.map((field) => field.value));

  const updatedTable = updatedValues.map((values) =>
    Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]))
  );
  return updatedTable;
};
