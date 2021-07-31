import { ascending, descending } from "d3-array";

export enum SortDirection {
  ASCENDING,
  DESCENDING,
}

export const changeSortDirection = (direction: SortDirection): SortDirection =>
  direction == SortDirection.ASCENDING
    ? SortDirection.DESCENDING
    : SortDirection.ASCENDING;

export const sortByColumn = (
  rows: Array<Array<string>>,
  index: number,
  sortDirection: SortDirection
): Array<Array<string>> => {
  const isNumericValue = !isNaN(Number(rows?.[0][index]));
  return rows.sort((a: string[], b: string[]) => {
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
