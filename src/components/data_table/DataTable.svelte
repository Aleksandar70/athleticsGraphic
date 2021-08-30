<script lang="ts">
  import {
    SortDirection,
    changeSortDirection,
    sortByColumn,
  } from "./sort.helper";
  import { Link } from "svelte-routing";
  import { Table } from "sveltestrap";
  import { isFlag, getAltName } from "./flag.helper";
  import type { Headers, TableData } from "../../../global/types";
  import { Paths } from "../../../global/constants/api";
  import { UIText } from "../../../global/constants/ui_text";
  import Pagination from "../pagination/Pagination.svelte";
  import { Constants } from "../../../global/constants/constants";
  import { setUnchanged } from "./table.helper";
  import { currentEventId, visibleColumns } from "../../config.store";
  import "./table.style.css";

  export let headerData: Headers;
  export let rowData: TableData;
  export let updateResult: boolean;
  export let currentPage: number;

  $: shouldShowAllColumns = $visibleColumns[$currentEventId].showAll;
  $: _visibleColumns = $visibleColumns[$currentEventId].columns;

  $: lowerRange = currentPage * Constants.ROWS_PER_TABLE;
  $: higherRange = lowerRange + (Constants.ROWS_PER_TABLE - 1);

  let sortDirection = SortDirection.DESCENDING;
  let sortBy = null;

  const updateSortDirection = (columnIndex: number): void => {
    sortDirection = changeSortDirection(sortDirection);
    sortBy = columnIndex;
  };

  $: sortedRows = rowData;

  $: if (sortBy !== null) {
    sortedRows = sortByColumn(rowData, sortBy, sortDirection);
  }

  $: if (updateResult) {
    sortedRows = setUnchanged(sortedRows);
    updateResult = undefined;
  }
</script>

<Table class="table-data" bordered>
  <thead class="table-header">
    <tr>
      {#each headerData as column, i}
        {#if _visibleColumns.includes(column.value) || shouldShowAllColumns}
          <th class="header-text" on:click={() => updateSortDirection(i)}
            >{column.value}</th
          >
        {/if}
      {/each}
    </tr>
  </thead>
  <tbody class="table-body">
    {#if sortedRows.length === 0}
      <tr
        ><td class="empty-data" colspan={headerData.length}
          >{UIText.NO_RESULTS}</td
        ></tr
      >
    {/if}
    {#each sortedRows as row, i}
      {#if i >= lowerRange && i <= higherRange}
        <tr>
          {#each row as data}
            {#if _visibleColumns.includes(data.id) || shouldShowAllColumns}
              {#if isFlag(data.stringValue)}
                <td>
                  <img
                    class="table-data--image"
                    alt={getAltName(data.stringValue)}
                    src={data.stringValue}
                  /></td
                >
              {:else if data.link}
                <td
                  ><Link
                    class="table-data--link"
                    to={`${Paths.EVENTS_PATH}/${data.link}`}
                    >{data.stringValue}</Link
                  ></td
                >
              {:else}
                <td
                  class="table-data--{data.changed ? 'changed' : 'unchanged'}"
                  contenteditable="true"
                  spellcheck="false"
                  bind:innerHTML={data.stringValue}
                  on:input={() =>
                    (data.changed = data.value != data.stringValue)}
                />
              {/if}
            {/if}
          {/each}
        </tr>
      {/if}
    {/each}
  </tbody>
</Table>
<Pagination bind:currentPage rowData={sortedRows} />
