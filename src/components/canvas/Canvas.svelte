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

  currentEventId.set(
    (tableData[0]?.event as string) ?? (tableData[0]?.eventId as string)
  );
  if (!Object.keys(visibleColumns).includes($currentEventId)) {
    console.log("USAO");
    const newVisibleColumns = visibleColumns;
    newVisibleColumns[$currentEventId] = defaultColumns;
    visibleColumns.set(JSON.stringify(newVisibleColumns));
  }

  const rows = getTableData(tableData, visibleColumns);

  let headerData = getHeaderData(tableData, visibleColumns);
  let rowData = rows;
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
    <ColumnDisplayOptionsModal bind:headerData bind:rowData />
    <Button on:click={() => onUpdate()}>{UIText.TABLE_SAVE}</Button>
    <FadingText result={updateResult} />
  </div>
</div>
