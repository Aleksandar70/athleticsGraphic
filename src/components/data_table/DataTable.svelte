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
  import {
    getCompetitorIdFromRow,
    isRowSelected,
    setLock,
    setUnchanged,
  } from "./table.helper";
  import {
    currentEventId,
    lockedColumns,
    selectedParticipant,
    visibleColumns,
  } from "../../stores/table.store";
  import { uneditableFields } from "../../../global/defaults";
  import "./table.style.css";

  export let headerData: Headers;
  export let rowData: TableData;
  export let updateResult: boolean;
  export let currentPage: number;
  let currentRow: number;
  let currentColumn: number;

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

  function handleKeyArrows(event) {
    const keyPressed = event.keyCode;
    console.log("keyPressed", keyPressed);
    if (keyPressed < 37 || keyPressed > 40) return;
    //left
    if (keyPressed === 37) currentColumn = Math.max(0, currentColumn - 1);
    //right
    if (keyPressed === 39)
      currentRow = Math.min(currentColumn + 1, sortedRows.length - 1);
    //up
    if (keyPressed === 38) currentRow = Math.max(0, currentColumn - 1);
    //down
    if (keyPressed === 40)
      currentRow = Math.min(currentRow + 1, sortedRows.length - 1);

    console.log("Key up is pressed!", event);
  }
</script>

<Table class="table-data" bordered>
  <thead class="table-header">
    <tr>
      {#each headerData as column, i}
        {#if _visibleColumns.includes(column.value) || shouldShowAllColumns}
          <th class="header-text" on:click={() => updateSortDirection(i)}
            >{column.value}{$lockedColumns && setLock(column.value)}</th
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
        <tr
          class="table-row {$selectedParticipant && isRowSelected(row)
            ? 'selected'
            : ''}"
          on:click={() =>
            selectedParticipant.set({
              id: getCompetitorIdFromRow(row),
              data: row,
            })}
        >
          {#each row as data, i}
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
              {:else if uneditableFields.includes(data.id)}
                <td>{data.stringValue}</td>
              {:else}
                <td
                  class="table-data--{data.changed ? 'changed' : 'unchanged'}"
                  contenteditable="true"
                  spellcheck="false"
                  bind:innerHTML={data.stringValue}
                  on:input={() =>
                    (data.changed = data.value != data.stringValue)}
                  on:keyup={handleKeyArrows}
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
