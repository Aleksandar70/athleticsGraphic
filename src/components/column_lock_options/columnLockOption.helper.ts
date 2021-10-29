import { get } from "svelte/store";
import { currentEventId, lockedColumns } from "../../stores/table.store";

export const toggleColumn = (
  value: string,
  currentLockedColumns: string[]
): void => {
  if (!currentLockedColumns) {
    lockedColumns.set({
      ...get(lockedColumns),
      [get(currentEventId)]: [] as string[],
    });
  }

  let columnData = get(lockedColumns)[get(currentEventId)];

  columnData = columnData?.includes(value)
    ? columnData.filter((column: string) => column !== value)
    : [...columnData, value];
  get(lockedColumns)[get(currentEventId)] = columnData;
  lockedColumns.set(get(lockedColumns));
};
