<script lang="ts">
  import {
    SortDirection,
    changeSortDirection,
    sortByColumn,
  } from "./sort.helper";

  import { isFlag, getAltName } from "./flag.helper";

  import "./table.style.css";

  export let headerData: Record<string, string>[] = [];
  export let rowData: Record<string, string>[][];

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
</script>

<table class="result-data">
  <tr>
    {#each headerData as column, i}
      {#if column.show}
        <th on:click={() => updateSortDirection(i)}>{column.value}</th>
      {/if}
    {/each}
  </tr>
  {#each sortedRows as row}
    <tr>
      {#each row as data}
        {#if data.show}
          {#if isFlag(data.value)}
            <td contenteditable="true" spellcheck="false"
              ><img
                class="flag"
                alt={getAltName(data.value)}
                src={data.value}
              /></td
            >
          {:else}
            <td
              contenteditable="true"
              spellcheck="false"
              bind:innerHTML={data.value}
            />
          {/if}
        {/if}
      {/each}
    </tr>
  {/each}
</table>
