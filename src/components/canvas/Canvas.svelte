<script lang="ts">
  import DataTable from "../data_table/DataTable.svelte";
  import { UIText } from "../../../global/constants/ui_text";
  import ColumnDisplayOptionsModal from "../column_display_options/ColumnDisplayOptions.svelte";
  import {
    getTableData,
    getHeaderData,
    search,
    updatedTableValues,
  } from "../data_table/table.helper";
  import "./canvas.style.css";
  import { Button, Input } from "sveltestrap";
  import type { ISearch } from "../../../global/interfaces";
  import type { RawData } from "../../../global/types";

  export let tableData: RawData;
  export let defaultColumns: string[];
  export let setSearch: ISearch = { enable: false };
  export let updateAction: Function;

  const rows = getTableData(tableData, defaultColumns);

  let headerData = getHeaderData(tableData, defaultColumns);
  let rowData = rows;

  let updateResult: boolean;

  const doSearch = (target: EventTarget) => {
    rowData = search((target as HTMLInputElement).value, setSearch.key, rows);
  };

  const onUpdate = async () => {
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
  <DataTable {headerData} {rowData} {updateResult} />
  <div class="table-options">
    <ColumnDisplayOptionsModal bind:headerData bind:rowData />
    <Button on:click={() => onUpdate()}>{UIText.TABLE_SAVE}</Button>
    {#if updateResult !== undefined}
      {#if updateResult}
        <span>Saved</span>
      {:else}
        <span>Not Saved</span>
      {/if}
    {/if}
  </div>
</div>
