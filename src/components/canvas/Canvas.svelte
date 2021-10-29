<script lang="ts">
  import DataTable from "../data_table/DataTable.svelte";
  import { UIText } from "../../../global/constants/ui_text";
  import ColumnDisplayOptionsModal from "../column_display_options/ColumnDisplayOptions.svelte";
  import {
    getTableData,
    getHeaderData,
    updatedTableValues,
    checkIfChanged,
  } from "../data_table/table.helper";
  import { Button } from "sveltestrap";
  import type { ISearch } from "../../../global/interfaces";
  import type { RawData } from "../../../global/types";
  import FadingText from "../fading_text/FadingText.svelte";
  import ColumnLockOptions from "../column_lock_options/ColumnLockOptions.svelte";
  import "./canvas.style.css";
  import Search from "../search/Search.svelte";
  import { setVisibleColumns } from "./canvas.helper";
  import { currentEventId, visibleColumns } from "../../stores/table.store";

  export let tableData: RawData;
  export let defaultColumns: string[];
  export let setSearch: ISearch = { enable: false };
  export let updateAction: Function;
  export let heatName: string = "single";

  const currentEvent = $visibleColumns[$currentEventId];
  if (!currentEvent) {
    setVisibleColumns(tableData, defaultColumns);
  }

  let rowData = getTableData(tableData, heatName);
  let headerData = getHeaderData(tableData);

  let currentPage = 0;

  let updateResult: boolean;

  const onUpdate = async (): Promise<void> => {
    if (!checkIfChanged(rowData)) return;
    const updatedValue = updatedTableValues(rowData);
    updateResult = await updateAction(updatedValue);
  };
</script>

<div class="canvas">
  {#if setSearch.enable}
    <Search key={setSearch.key} bind:rowData bind:currentPage />
  {/if}
  <DataTable
    {heatName}
    {headerData}
    {rowData}
    {updateResult}
    bind:currentPage
  />
  <div class="table-options">
    <ColumnDisplayOptionsModal bind:headerData />
    <ColumnLockOptions bind:headerData />
    <Button on:click={() => onUpdate()}>{UIText.TABLE_SAVE}</Button>
    <FadingText result={updateResult} />
  </div>
</div>
