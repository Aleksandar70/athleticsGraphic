<script lang="ts">
  import {
    SortDirection,
    changeSortDirection,
    sortByColumn,
  } from "./sort.helper";
  import { hideColumn, getEmptyColumns } from "./table.helper";

  import { isFlag, getAltName } from "./flag.helper";

  import "./table.style.css";

  export let fields: Array<string>;
  export let rows: Array<Array<string>>;

  $: headers = getColumnData(fields);

  $: tableData = getData(rows);

  let emptyColumns = getEmptyColumns(rows);

  const getData = (rows) => {
    const dataSize = rows.length;
    const tableData = rows.map((row) => {
      return row.map((field, idx) => ({
        value: field,
        show: setIsShown(emptyColumns, idx, dataSize),
        id: idx,
      }));
    });
    return tableData;
  };

  const getColumnData = (fields) => {
    const dataSize = rows.length;
    const tableColumns = fields.map((data, idx) => ({
      id: idx,
      value: data,
      show: setIsShown(emptyColumns, idx, dataSize),
    }));
    return tableColumns;
  };

  const setIsShown = (
    emptyColumns: Map<number, number>,
    idx: number,
    limit: number
  ): boolean => {
    if (!emptyColumns.has(idx)) {
      return true;
    }

    return emptyColumns.get(idx) < limit;
  };

  let sortDirection = SortDirection.DESCENDING;
  let sortBy = null;

  const updateSortDirection = (columnIndex: number): void => {
    sortDirection = changeSortDirection(sortDirection);
    sortBy = columnIndex;
  };

  $: sortedRows = tableData;

  $: if (sortBy !== null) {
    sortedRows = sortByColumn(tableData, sortBy, sortDirection);
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
