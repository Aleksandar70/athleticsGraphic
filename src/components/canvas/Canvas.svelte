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
    filterTableHeaderData,
    filterRowData,
filterHeaderData,
  } from "../data_table/table.helper";
  import "./canvas.style.css";
  import { Button, Input } from "sveltestrap";
  import type { ISearch } from "../../../global/interfaces";
  import type { RawData } from "../../../global/types";
  import FadingText from "../fading_text/FadingText.svelte";
  import { currentEventId, visibleColumns } from "../../config.store";

  export let tableData: RawData;
  export let defaultColumns: string[];
  export let setSearch: ISearch = { enable: false };
  export let updateAction: Function;

  currentEventId.set((tableData[0]?.event as string) ?? "events");

  if (!$visibleColumns[$currentEventId]) {
    const newVisibleColumns = $visibleColumns;
    newVisibleColumns[$currentEventId] = {
      showAll: false,
      columns: [...defaultColumns],
    };
    visibleColumns.set(newVisibleColumns);
  }

  const rows = getTableData(tableData);
  let headerData = getHeaderData(tableData);
  let filteredHeaderData = filterTableHeaderData(headerData);
  // let filteredHeaderDataModel = filterHeaderData(headerData);
  let rowData = rows;
  let filteredRowData = filterRowData(rowData);
  let currentPage = 0;

  let updateResult: boolean;

  const doSearch = (target: EventTarget) => {
    currentPage = 0;
    rowData = search((target as HTMLInputElement).value, setSearch.key, rows);
  };

  const onUpdate = async (): Promise<void> => {
    if (!checkIfChanged(rowData)) return;
    const eventId = tableData?.[0].event as string;
    const updatedValue = updatedTableValues(rowData);
    updateResult = await updateAction(updatedValue, eventId);
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
  <DataTable
    {filteredHeaderData}
    {filteredRowData}
    {updateResult}
    bind:currentPage
  />
  <div class="table-options">
    <ColumnDisplayOptionsModal bind:filteredHeaderData />
    <Button on:click={() => onUpdate()}>{UIText.TABLE_SAVE}</Button>
    <FadingText result={updateResult} />
  </div>
</div>
