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

  import "./table.style.css";
  import { Paths } from "../../../global/constants/api";
  import { UIText } from "../../../global/constants/ui_text";
  import { setUnchanged } from "./table.helper";

  export let headerData: Headers;
  export let rowData: TableData;
  export let updateResult: boolean;

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
        ><td class="empty-data" colspan={headerData.length}
          >{UIText.NO_RESULTS}</td
        ></tr
      >
    {/if}
    {#each sortedRows as row}
      <tr>
        {#each row as data}
          {#if data.show}
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
                style="background-color: {data.changed ? `#fffedb` : 'white'};"
                contenteditable="true"
                spellcheck="false"
                bind:innerHTML={data.stringValue}
                on:input={() => (data.changed = data.value != data.stringValue)}
              />
            {/if}
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</Table>
