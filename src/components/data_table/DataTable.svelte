<script lang="ts">
  import {
    SortDirection,
    changeSortDirection,
    sortByColumn,
  } from "./sort.helper";
  import { hideColumn } from "./table.helper";

  import { isFlag, getAltName } from "./flag.helper";

  import "./table.style.css";

  export let fields: Array<string>;
  export let rows: Array<Array<string>>;

  $: headers = fields.map((data, i) => ({
    id: i,
    value: data,
    show: true,
  }));

  let tableData = rows.map((row) =>
    row.map((field, idx) => ({ value: field, show: true, id: idx }))
  );

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

{#each headers as field}
  <label>
    <input
      type="checkbox"
      on:change={() => {
        field.show = !field.show;
        tableData = hideColumn(field, tableData);
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
  {#each tableData as row}
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
