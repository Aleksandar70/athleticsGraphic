import { ascending, descending } from "d3-array";
import type { TableData, TableRow } from "../../../global/types";

export enum SortDirection {
  ASCENDING,
  DESCENDING,
}

export const changeSortDirection = (direction: SortDirection): SortDirection =>
  direction == SortDirection.ASCENDING
    ? SortDirection.DESCENDING
    : SortDirection.ASCENDING;

export const sortByColumn = (
  rows: TableData,
  index: number,
  sortDirection: SortDirection
): TableData => {
  const isNumericValue = !isNaN(Number(rows?.[0][index]?.value));
  return rows.sort((a: TableRow, b: TableRow) => {
    const firstValue = isNumericValue
      ? Number(a[index].value)
      : (a[index].value.toString().toLowerCase() as string);
    const secondValue = isNumericValue
      ? Number(b[index].value)
      : (b[index].value.toString().toLowerCase() as string);
    return sortDirection === SortDirection.ASCENDING
      ? ascending(firstValue, secondValue)
      : descending(firstValue, secondValue);
  });
};
