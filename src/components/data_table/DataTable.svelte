<script lang="ts">
  import { ascending, descending } from "d3-array";
  export let headers;
  export let rows;

  $: sortStatus = [];
  $: sortDirection = "ascending";
  $: sortNumber = rows[0].map((d) => !isNaN(d));

  function updateSortStatus(column, index) {
    headers.forEach((d) => {
      sortStatus[d] = "none";
    });

    sortDirection === "ascending"
      ? (sortDirection = "descending")
      : (sortDirection = "ascending");
    sortStatus[column] = sortDirection;
  }

  $: headers.forEach((d) => {
    sortStatus[d] = "none";
  });

  $: sortBy = "none";

  $: sortedRows = rows;

  $: if (sortBy !== "none" && sortNumber[sortBy] === false) {
    console.log(sortBy);
    if (sortDirection === "ascending")
      sortedRows = rows.sort((a, b) =>
        ascending(a[sortBy].toLowerCase(), b[sortBy].toLowerCase())
      );
    else
      sortedRows = rows.sort((a, b) =>
        descending(a[sortBy].toLowerCase(), b[sortBy].toLowerCase())
      );
  }

  $: if (sortBy !== "none" && sortNumber[sortBy] === true) {
    if (sortDirection === "ascending")
      sortedRows = rows.sort((a, b) => ascending(a[sortBy], b[sortBy]));
    else sortedRows = rows.sort((a, b) => descending(a[sortBy], b[sortBy]));
  }

  // let vals = [];

  // let ascending = true;

  // $: sort = (column) => {
  //   data.sort((a, b) => {
  //     var nameA = a.name.toUpperCase();
  //     var nameB = b.name.toUpperCase();
  //     return ascending
  //       ? nameA.localeCompare(nameB)
  //       : nameB.localeCompare(nameA);
  //   });
  //   ascending = !ascending;
  //   vals = convert();
  // };

  function deleteRow(rowToBeDeleted) {
    data = data.filter((row) => row != rowToBeDeleted);
  }
</script>

<table class="result-data">
  <tr>
    {#each headers as column, i (column)}
      <th
        aria-sort={sortStatus[column]}
        role="columnheader"
        scope="col"
        on:click={() => {
          sortBy = i;
          updateSortStatus(column, i);
        }}>{column}</th
      >
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

<style lang="scss">
  $table-breakpoint: 480px;
  $table-background-color: #fff;
  $table-text-color: #024457;
  $table-outer-border: 1px solid #167f92;
  $table-cell-border: 1px solid #d9e4e6;

  $table-border-radius: 10px;
  $table-focus-color: #c0fcf6;
  $table-highlight-color: #eaf3f3;
  $table-header-background-color: #167f92;
  $table-header-text-color: #fff;
  $table-header-border: 1px solid #fff;

  @mixin result-data(
    $breakpoint: $table-breakpoint,
    $background-color: $table-background-color,
    $text-color: $table-text-color,
    $outer-border: $table-outer-border,
    $cell-border: $table-cell-border,
    $border-radius: none,
    $highlight-color: none,
    $header-background-color: $table-background-color,
    $header-text-color: $table-text-color,
    $header-border: $table-cell-border
  ) {
    .result-data {
      margin: 1em 0;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      background: $background-color;
      color: $text-color;
      border-radius: $border-radius;
      border: $outer-border;

      tr {
        border: $cell-border;

        &:nth-child(odd) {
          background-color: $highlight-color;
        }
      }

      th {
        display: none;
        border: $header-border;
        background-color: $header-background-color;
        color: $header-text-color;
        padding: 1em;

        &:first-child {
          display: table-cell;
          text-align: center;
        }

        &:nth-child(2) {
          display: table-cell;

          &:after {
            content: attr(data-th);
          }
        }

        @media (min-width: $breakpoint) {
          &:nth-child(2) {
            &:after {
              display: none;
            }
          }
        }
      }

      td {
        display: block;
        word-wrap: break-word;

        &:focus {
          background: $table-focus-color;
        }

        &:first-child {
          display: table-cell;
          text-align: center;
          border-right: $cell-border;
        }

        @media (min-width: $breakpoint) {
          border: $cell-border;
        }
      }

      th,
      td {
        text-align: left;
        margin: 0.5em 1em;

        @media (min-width: $breakpoint) {
          display: table-cell;
          padding: 1em;
        }
      }
    }
  }

  @include result-data(
    $border-radius: $table-border-radius,
    $highlight-color: $table-highlight-color,
    $header-background-color: $table-header-background-color,
    $header-text-color: $table-header-text-color,
    $header-border: $table-header-border
  );
</style>
