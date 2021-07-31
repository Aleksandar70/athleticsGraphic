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

export const sortByColumn = (
  rows: TableType[][],
  index: number,
  sortDirection: SortDirection
): TableType[][] => {
  if (typeof rows?.[0][index] === "string") {
    return rows.sort((a: string[], b: string[]) => {
      return sortValues(
        a[index].toLocaleLowerCase(),
        b[index].toLocaleLowerCase(),
        sortDirection
      );
    });
  }
  return rows.sort((a: number[], b: number[]) => {
    return sortValues(a[index], b[index], sortDirection);
  });
};

const sortValues = (
  a: TableType,
  b: TableType,
  direction: SortDirection
): number =>
  direction === SortDirection.ASCENDING ? ascending(a, b) : descending(a, b);
