<script lang="ts">
  import DataTable from "../data_table/DataTable.svelte";
  import { UIText } from "../../../global/constants/ui_text";
  import ColumnDisplayOptionsModal from "../column_display_options/ColumnDisplayOptions.svelte";
  import {
    getTableData,
    getHeaderData,
    search,
    updatedTableValues,
    checkIfChanged,
  } from "../data_table/table.helper";
  import { Button, Input } from "sveltestrap";
  import type { ISearch } from "../../../global/interfaces";
  import type { RawData } from "../../../global/types";
  import FadingText from "../fading_text/FadingText.svelte";
  import { isNumeric } from "../../utils/string.utils";
  import { currentEventId, visibleColumns } from "../../stores/table.store";
  import ColumnLockOptions from "../column_lock_options/ColumnLockOptions.svelte";
  import "./canvas.style.css";

  export let tableData: RawData;
  export let defaultColumns: string[];
  export let setSearch: ISearch = { enable: false };
  export let updateAction: Function;

  const currentEvent = $visibleColumns[$currentEventId];
  if (!currentEvent) {
    const newVisibleColumns = $visibleColumns;
    const trialNumbers = Object.keys(tableData[0]).filter((key) =>
      isNumeric(key)
    );
    newVisibleColumns[$currentEventId] = {
      showAll: false,
      columns: [...defaultColumns, ...trialNumbers],
    };
    visibleColumns.set(newVisibleColumns);
  }

  const rows = getTableData(tableData);
  let rowData = rows;
  let headerData = getHeaderData(tableData);

  let currentPage = 0;

  let updateResult: boolean;

  const doSearch = (target: EventTarget) => {
    currentPage = 0;
    rowData = search((target as HTMLInputElement).value, setSearch.key, rows);
  };

  const onUpdate = async (): Promise<void> => {
    if (!checkIfChanged(rowData)) return;
    const updatedValue = updatedTableValues(rowData);
    updateResult = await updateAction(updatedValue);
  };
</script>

<div class="canvas">
  {#if setSearch.enable}
    <Input
      class="input-search"
      type="search"
      bsSize="sm"
      placeholder="🔎 Search by {setSearch.key}"
      on:input={(event) => doSearch(event.target)}
    />
  {/if}
  <DataTable {headerData} {rowData} {updateResult} bind:currentPage />
  <div class="table-options">
    <ColumnDisplayOptionsModal bind:headerData />
    <ColumnLockOptions bind:headerData />
    <Button on:click={() => onUpdate()}>{UIText.TABLE_SAVE}</Button>
    <FadingText result={updateResult} />
  </div>
</div>
