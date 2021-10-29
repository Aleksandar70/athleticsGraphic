import { get } from "svelte/store";
import type { RawData } from "../../../global/types";
import { currentEventId, visibleColumns } from "../../stores/table.store";
import { isNumeric } from "../../utils/string.utils";

export const setVisibleColumns = (
  tableData: RawData,
  defaultColumns: string[]
): void => {
  const newVisibleColumns = get(visibleColumns);
  const trialNumbers = Object.keys(tableData[0]).filter((key) =>
    isNumeric(key)
  );
  newVisibleColumns[get(currentEventId)] = {
    showAll: false,
    columns: [...defaultColumns, ...trialNumbers],
  };
  visibleColumns.set(newVisibleColumns);
};
