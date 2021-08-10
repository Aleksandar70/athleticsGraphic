import type {
  FieldData,
  HeaderData,
  RawData,
  TableData,
} from "../../../global/types";

export const parseTableData = (data: RawData): unknown[][] =>
  data?.map((d) => Object.keys(d).map((key) => [d[key]]));

export const parseHeaderData = (data: HeaderData): string[] => {
  if (data?.length > 0) {
    return Object.keys(data?.[0])?.map((val: string) =>
      val.replaceAll("_", " ").toUpperCase()
    );
  }
};

export const hideColumn = (field: FieldData, data: TableData): TableData => {
  data.forEach((record) => {
    const rec = record.find((element) => element.id === field.id);
    rec.show = !rec.show;
  });
  return data;
};

export const getEmptyColumns = (rows: TableData): Map<number, number> => {
  const emptyColumns = new Map<number, number>();
  rows?.forEach((row) => {
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

export const getFieldLinks = (rows: RawData): Map<string, string> => {
  const fielsLinks = new Map<string, string>();
  rows?.forEach((data: Record<string, string>) => {
    fielsLinks.set(data.name, data.eventId);
  });
  return fielsLinks;
};

export const getTableData = (rawData: RawData): TableData => {
  const rows = parseTableData(rawData);
  const emptyColumns = getEmptyColumns(rows as TableData);
  const links = getFieldLinks(rawData);
  const tableData = rows?.map((row) => {
    return row.map((field, idx) => ({
      value: field.toString(),
      show: setFiledVisibility(emptyColumns, idx, rows.length),
      link: links?.get(field.toString()),
      id: idx,
    }));
  });
  return tableData;
};

export const getHeaderData = (tableData: RawData): HeaderData => {
  const headers = parseHeaderData(tableData);
  const emptyColumns = getEmptyColumns(parseTableData(tableData) as TableData);
  const tableColumns = headers?.map((data, idx) => ({
    id: idx,
    value: data,
    show: setFiledVisibility(emptyColumns, idx, tableData.length),
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
