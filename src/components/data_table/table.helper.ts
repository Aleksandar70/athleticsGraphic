import { tempGetData } from "../../../backend/src/api/openTrack";

export const fetchData = async (): Promise<Record<string, unknown>[]> => {
  const fetchedData = await tempGetData();
  return fetchedData.results;
};

export const parseHeaderData = (data: Record<string, unknown>[]): string[] =>
  Object.keys(data?.[0])?.map((val: string) =>
    val.replaceAll("_", " ").toUpperCase()
  );

export const parseTableData = (data: Record<string, unknown>[]): unknown[][] =>
  data?.map((d) => Object.keys(d).map((key) => [d[key]]));

export const hideColumn = (
  field: Record<string, unknown>,
  data: Record<string, unknown>[][]
): Record<string, unknown>[][] => {
  data.forEach((record) => {
    const rec = record.find((element) => element.id === field.id);
    rec.show = !rec.show;
  });
  return data;
};

export const getEmptyColumns = (rows: string[][]): Map<number, number> => {
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
): Record<string, unknown>[][] => {
  const tableData = rows.map((row) => {
    return row.map((field, idx) => ({
      value: field,
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
): Record<string, unknown>[] => {
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
