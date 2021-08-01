<script lang="ts">
  import {
    SortDirection,
    changeSortDirection,
    sortByColumn,
  } from "./sort.helper";
  import {
    hideColumn,
    getEmptyColumns,
    getTableData,
    getColumnData,
  } from "./table.helper";

  import { isFlag, getAltName } from "./flag.helper";

  import "./table.style.css";

  export let fields: Array<string>;
  export let tableData: Array<Array<string>>;

  let emptyColumns = getEmptyColumns(tableData);

  let sortDirection = SortDirection.DESCENDING;
  let sortBy = null;

  $: headers = getColumnData(fields, emptyColumns, tableData.length);

  $: rows = getTableData(tableData, emptyColumns);

  const updateSortDirection = (columnIndex: number): void => {
    sortDirection = changeSortDirection(sortDirection);
    sortBy = columnIndex;
  };

  $: sortedRows = rows;

  $: if (sortBy !== null) {
    sortedRows = sortByColumn(rows, sortBy, sortDirection);
  }
</script>

{#each headers as field}
  <label>
    <input
      type="checkbox"
      on:change={() => {
        field.show = !field.show;
        rows = hideColumn(field, rows);
      }}
      value={field.value}
      checked={field.show}
    />
    {field.value}
  </label>
{/each}

<table class="result-data">
  <tr>
    {#each headers as column, i (column.id)}
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
