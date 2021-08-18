<script lang="ts">
  import DataTable from "../data_table/DataTable.svelte";
  import { UIText } from "../../../global/constants/ui_text";
  import ColumnDisplayOptionsModal from "../column_display_options/ColumnDisplayOptions.svelte";
  import {
    getTableData,
    getHeaderData,
    search,
    paginate,
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
  //moje
  const paginatedEvents = paginate(rows);
  let page = 0;
  let currentPageRows = paginatedEvents[page]; //page is not working
  let totalPages = [...paginatedEvents];
  console.log("page2 ", page);
  $: currentPageRows = totalPages.length > 0 ? totalPages[page] : []; //page is not working

  let headerData = getHeaderData(tableData, defaultColumns);
  let rowData = rows;

  const doSearch = (target: EventTarget) => {
    if ((target as HTMLInputElement).value === "") {
      currentPageRows = currentPageRows;
    } else {
      currentPageRows = search(
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
  {#if currentPageRows?.length}
    <DataTable {headerData} rowData={currentPageRows} />
  {/if}
  <TablePagination bind:totalPages bind:page />
  <div class="table-options">
    <ColumnDisplayOptionsModal bind:headerData bind:rowData />
    <Button on:click={() => {}}>{UIText.TABLE_SAVE}</Button>
  </div>
</div>
