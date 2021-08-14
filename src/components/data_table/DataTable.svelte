<script lang="ts">
  import {
    SortDirection,
    changeSortDirection,
    sortByColumn,
  } from "./sort.helper";
  import { Link } from "svelte-routing";
  import { Table } from "sveltestrap";
  import { isFlag, getAltName } from "./flag.helper";
  import type { HeaderData, TableData } from "../../../global/types";

  import "./table.style.css";
  import { Paths } from "../../../global/constants/api";

  export let headerData: HeaderData;
  export let rowData: TableData;

  let sortDirection = SortDirection.DESCENDING;
  let sortBy = null;

  const updateSortDirection = (columnIndex: number): void => {
    sortDirection = changeSortDirection(sortDirection);
    sortBy = columnIndex;
  };

  $: sortedRows = rowData as Record<string, string>[][];

  $: if (sortBy !== null) {
    sortedRows = sortByColumn(rowData, sortBy, sortDirection) as Record<
      string,
      string
    >[][];
  }
</script>

<Table class="table-data" bordered>
  <thead class="table-header">
    <tr>
      {#each headerData as column, i}
        {#if column.show}
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
        ><td class="empty-data" colspan={headerData.length}>No Results 😐</td
        ></tr
      >
    {/if}
    {#each sortedRows as row}
      <tr>
        {#each row as data}
          {#if data.show}
            {#if isFlag(data.value)}
              <td>
                <img
                  class="table-data--image"
                  alt={getAltName(data.value)}
                  src={data.value}
                /></td
              >
            {:else if data.link}
              <td
                ><Link
                  class="table-data--link"
                  to={`${Paths.EVENTS_PATH}/${data.link}`}>{data.value}</Link
                ></td
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
  </tbody>
</Table>
