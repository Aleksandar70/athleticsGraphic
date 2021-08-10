<script>
  import DataTable from "../../data_table/DataTable.svelte";
  import { onMount } from "svelte";
  import { UIText } from "../../../../global/constants/ui_text";
  import ColumnDisplayOptions from "../../column_display_options/ColumnDisplayOptions.svelte";
  import Modal, { getModal } from "../../modal/Modal.svelte";
  import {
    parseHeaderData,
    parseTableData,
    getEmptyColumns,
    getTableData,
    getHeaderData,
    getFieldLinks,
  } from "../../data_table/table.helper";

  import { getResults } from "../../../api/result.api";

  export let eventId;

  $: tableData = [];

  onMount(async () => {
    const requestData = {
      eventId: eventId,
      gType: "remote",
    };
    tableData = await getResults(requestData);
  });

  $: headers = parseHeaderData(tableData);
  $: rows = parseTableData(tableData);

  $: emptyColumns = getEmptyColumns(rows);
  $: links = getFieldLinks(tableData);

  $: headerData = getHeaderData(headers, emptyColumns, tableData?.length);
  $: rowData = getTableData(rows, emptyColumns, links);
</script>

<div class="canvas">
  {#if headerData && rowData}
    <Modal>
      <ColumnDisplayOptions bind:headerData bind:rowData />
    </Modal>
    <button on:click={() => getModal().open()}>{UIText.COLUMN_TOGGLE}</button>
    <DataTable {headerData} {rowData} />
  {:else}
    <h1>Loading...</h1>
  {/if}
</div>
