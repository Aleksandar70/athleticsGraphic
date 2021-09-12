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
    getEditableColumns,
    isRowSelected,
    setLock,
    setUnchanged,
  } from "./table.helper";
  import {
    currentEventId,
    lockedColumns,
    selectedParticipant,
    visibleColumns,
    currentColumn,
    currentRow,
  } from "../../stores/table.store";
  import { uneditableFields } from "../../../global/defaults";
  import "./table.style.css";
  import { onMount } from "svelte";
  import { getMaxPage } from "../pagination/pagination.helper";

  export let headerData: Headers;
  export let rowData: TableData;
  export let updateResult: boolean;
  export let currentPage: number;

  let focusCell;
  let editableColumns: string[] = [];

  $: shouldShowAllColumns = $visibleColumns[$currentEventId].showAll;
  $: _visibleColumns = $visibleColumns[$currentEventId].columns;

  onMount(() => {
    focusCell?.focus();

    editableColumns = getEditableColumns(shouldShowAllColumns, _visibleColumns);
  });

  $: lowerRange = currentPage * Constants.ROWS_PER_TABLE;
  $: higherRange = lowerRange + (Constants.ROWS_PER_TABLE - 1);

  $: editableColumns = getEditableColumns(
    shouldShowAllColumns,
    _visibleColumns
  );

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

  const handleKeyArrows = (event) => {
    const keyPressed = event.keyCode;
    const columnCount = editableColumns.length - 1;

    //left
    if (keyPressed === 37) {
      currentColumn.set(
        $currentColumn === 0 ? columnCount : $currentColumn - 1
      );
    }

    //right
    if (keyPressed === 39) {
      currentColumn.set($currentColumn < columnCount ? $currentColumn + 1 : 0);
    }

    //up
    if (keyPressed === 38) {
      if ($currentRow === lowerRange) {
        if (lowerRange === 0) {
          currentPage = getMaxPage(sortedRows.length);
          currentRow.set(sortedRows.length - 1);
        } else {
          currentPage -= 1;
          currentRow.set($currentRow - 1);
        }
      } else {
        currentRow.set($currentRow - 1);
      }
    }

    //down
    if (keyPressed === 40) {
      if ($currentRow === sortedRows.length - 1) {
        currentPage = 0;
        currentRow.set(0);
      } else if ($currentRow === higherRange) {
        currentPage += 1;
        currentRow.set($currentRow + 1);
      } else {
        currentRow.set($currentRow + 1);
      }
    }
  };

  function handleMouseClick(event, row, column) {
    currentRow.set(row);
    currentColumn.set(editableColumns.findIndex((header) => header === column));
    focusCell = event.target;
  }

  $: if (focusCell) {
    focusCell?.focus();
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
          on:click={() => selectedParticipant.set(row)}
        >
          {#each row as data}
            {#if _visibleColumns.includes(data.id) || shouldShowAllColumns}
              {#if $currentRow === i && editableColumns[$currentColumn] === data.id}
                <td
                  class="table-data--{data.changed ? 'changed' : 'unchanged'}"
                  contenteditable="true"
                  spellcheck="false"
                  on:keydown={handleKeyArrows}
                  bind:this={focusCell}
                  bind:innerHTML={data.stringValue}
                  on:input={() =>
                    (data.changed = data.value != data.stringValue)}
                />
              {:else if isFlag(data.stringValue)}
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
                  on:click={(event) => handleMouseClick(event, i, data.id)}
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
