import { Constants } from "../../../global/constants/constants";
import type {
  HeaderField,
  RawData,
  TableData,
  Headers,
} from "../../../global/types";

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

export const paginate = (events) => {
  const pages = Math.ceil(events.length / Constants.ROWS_PER_TABLE);

  const paginatedEvents = Array.from({ length: pages }, (_, index) => {
    const start = index * Constants.ROWS_PER_TABLE;
    return events.slice(start, start + Constants.ROWS_PER_TABLE);
  });
  return paginatedEvents;
};

// TODO: To be fixed with the ticket `Fix table data saving`
// export const getUpdatedTable = (tableData, rowData) => {
//   const keys = Object.keys(tableData[0]);
//   const updatedValues = rowData.map((row) => row.map((field) => field.value));

//   const updatedTable = updatedValues.map((values) =>
//     Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]))
//   );
//   return updatedTable;
// };
