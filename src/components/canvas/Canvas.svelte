<script lang="ts">
  import DataTable from "../data_table/DataTable.svelte";
  import { UIText } from "../../../global/constants/ui_text";
  import ColumnDisplayOptionsModal from "../column_display_options/ColumnDisplayOptions.svelte";
  import {
    getTableData,
    getHeaderData,
    getUpdatedTable,
    search,
  } from "../data_table/table.helper";
  import "./canvas.style.css";
  import { updateCompetitors } from "../../api/competitor.api";
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
    <Input type="search" on:input={(event) => doSearch(event)} />
  {/if}
  <ColumnDisplayOptionsModal bind:headerData bind:rowData />
  <DataTable {headerData} {rowData} />
  <Button
    on:click={() => updateCompetitors(getUpdatedTable(tableData, rowData))}
    >{UIText.TABLE_SAVE}</Button
  >
</div>
