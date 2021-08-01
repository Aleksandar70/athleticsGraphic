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
  rows: Array<Array<Record<string, string>>>,
  index: number,
  sortDirection: SortDirection
): Array<Array<Record<string, string>>> => {
  const isNumericValue = !isNaN(Number(rows?.[0][index]?.value));
  return rows.sort(
    (a: Record<string, string>[], b: Record<string, string>[]) => {
      const firstValue = isNumericValue
        ? a[index].value
        : a[index].value.toString().toLowerCase();
      const secondValue = isNumericValue
        ? b[index].value
        : b[index].value.toString().toLowerCase();
      return sortDirection === SortDirection.ASCENDING
        ? ascending(firstValue, secondValue)
        : descending(firstValue, secondValue);
    }
  );
};
