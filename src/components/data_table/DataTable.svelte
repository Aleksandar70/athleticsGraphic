<script lang="ts">
  import {
    SortDirection,
    changeSortDirection,
    sortByColumn,
  } from "./sort.helper";

  import { isFlag, getAltName } from "./flag.helper";

  import "./table.style.css";

  export let headers: Array<string>;
  export let rows: Array<Array<string>>;

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
        {#if isFlag(value)}
          <td contenteditable="true" spellcheck="false"
            ><img class="flag" alt={getAltName(value)} src={value} /></td
          >
        {:else}
          <td
            contenteditable="true"
            spellcheck="false"
            bind:innerHTML={value}
          />
        {/if}
      {/each}
    </tr>
  {/each}
</table>
