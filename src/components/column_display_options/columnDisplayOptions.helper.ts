import { get } from "svelte/store";
import { visibleColumns, currentEventId } from "../../stores/table.store";
import { isNumeric } from "../../utils/string.utils";
import { getDefaultColumns } from "../data_table/table.helper";
import type { Headers } from "../../../global/types";

export const toggleColumn = (value: string, headerData: Headers): void => {
  const columnData = get(visibleColumns)[get(currentEventId)];
  let columns = columnData.columns;

  if (columnData.showAll) {
    const allColumns = headerData.map((headers) => headers.value);
    columns = allColumns;
    columnData.showAll = false;
  }

  columns = columns.includes(value)
    ? columns.filter((column: string) => column !== value)
    : [...columns, value];
  get(visibleColumns)[get(currentEventId)].columns = columns;
  visibleColumns.set(get(visibleColumns));
};

export const toggleDefaultColumns = (headerData: Headers): void => {
  const trialNumbers = headerData
    .filter((data) => isNumeric(data.value))
    .map((data) => data.value);
  const _defaultColumns = getDefaultColumns();
  get(visibleColumns)[get(currentEventId)].columns = [
    ..._defaultColumns,
    ...trialNumbers,
  ];

  get(visibleColumns)[get(currentEventId)].showAll = false;
  visibleColumns.set(get(visibleColumns));
};
