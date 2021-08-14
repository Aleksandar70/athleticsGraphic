<script lang="ts">
  import DataTable from "../data_table/DataTable.svelte";
  import { UIText } from "../../../global/constants/ui_text";
  import ColumnDisplayOptionsModal from "../column_display_options/ColumnDisplayOptions.svelte";
  import {
    getTableData,
    getHeaderData,
    search,
  } from "../data_table/table.helper";
  import "./canvas.style.css";
  import { Button, Input } from "sveltestrap";
  import type { ISearch } from "../../../global/interfaces";

  export let tableData;
  export let defaultColumns;
  export let setSearch: ISearch = { enable: false };

  const rows = getTableData(tableData, defaultColumns);

  let headerData = getHeaderData(tableData, defaultColumns);
  let rowData = rows;

  const doSearch = (event) =>
    (rowData = search(
      (event.target as HTMLInputElement).value,
      setSearch.key,
      rows
    ));
</script>

<div class="canvas">
  {#if setSearch.enable}
    <Input
      class="input-search"
      type="search"
      bsSize="sm"
      placeholder="🔎 Search by {setSearch.key}"
      on:input={(event) => doSearch(event)}
    />
  {/if}
  <DataTable {headerData} {rowData} />
  <div class="table-options">
    <ColumnDisplayOptionsModal bind:headerData bind:rowData />
    <Button on:click={() => {}}>{UIText.TABLE_SAVE}</Button>
  </div>
</div>
