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
  import type { RawData } from "../../../global/types";
  import TablePagination from "../pagination/TablePagination.svelte";

  export let tableData: RawData;
  export let defaultColumns: string[];
  export let setSearch: ISearch = { enable: false };

  const rows = getTableData(tableData, defaultColumns);
  let headerData = getHeaderData(tableData, defaultColumns);
  let rowData = rows;
  let currentPageRows;
  $: displayRows = currentPageRows;
  
  const doSearch = (target: EventTarget) => {
    if ((target as HTMLInputElement).value === "") {
      displayRows = currentPageRows;
    } else {
      displayRows = search(
        (target as HTMLInputElement).value,
        setSearch.key,
        rows
      );
    }
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
  {#if displayRows}
    <DataTable {headerData} rowData={displayRows} />
  {/if}
  {#if rowData?.length}
    <TablePagination bind:currentPageRows {rowData} />
  {/if}
  <div class="table-options">
    <ColumnDisplayOptionsModal bind:headerData bind:rowData />
    <Button on:click={() => {}}>{UIText.TABLE_SAVE}</Button>
  </div>
</div>
