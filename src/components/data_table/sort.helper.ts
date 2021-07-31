import { ascending, descending } from "d3-array";
import type { TableType } from "./table.helper";

export enum SortDirection {
  ASCENDING,
  DESCENDING,
}

export const changeSortDirection = (direction: SortDirection): SortDirection =>
  direction == SortDirection.ASCENDING
    ? SortDirection.DESCENDING
    : SortDirection.ASCENDING;

export const sortByColumn = <K extends keyof TableType>(
  rows: Array<Array<K>>,
  index: number,
  sortDirection: SortDirection
): Array<Array<K>> => {
  const isNumericValue = !isNaN(Number(rows?.[0][index]));
  return rows.sort((a: K[], b: K[]) => {
    const firstValue = isNumericValue
      ? a[index]
      : a[index].toString().toLowerCase();
    const secondValue = isNumericValue
      ? b[index]
      : b[index].toString().toLowerCase();
    return sortDirection === SortDirection.ASCENDING
      ? ascending(firstValue, secondValue)
      : descending(firstValue, secondValue);
  });
};
