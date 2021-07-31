<script lang="ts">
  import {
    SortDirection,
    changeSortDirection,
    sortByColumn,
  } from "./sort.helper";

  import type { TableType } from "./table.helper";

  import "./table.style.css";

  export let headers: Array<string>;
  export let rows: Array<Array<TableType>>;

  let sortDirection = SortDirection.DESCENDING;
  let sortBy = null;

  const updateSortDirection = (columnIndex: number): void => {
    sortDirection = changeSortDirection(sortDirection);
    sortBy = columnIndex;
  };

  $: sortedRows = rows;

  $: if (sortBy !== null) {
    sortedRows = sortByColumn(rows, sortBy, sortDirection);
  }
</script>

<table class="result-data">
  <tr>
    {#each headers as column, i (column)}
      <th on:click={() => updateSortDirection(i)}>{column}</th>
    {/each}
  </tr>
  {#each sortedRows as row}
    <tr>
      {#each row as value}
        <td contenteditable="true" bind:innerHTML={value} />
      {/each}
    </tr>
  {/each}
</table>
