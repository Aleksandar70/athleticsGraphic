<script lang="ts">
  import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";
  import { Constants } from "../../../global/constants/constants";
  import type { TableData } from "../../../global/types";
  import "./pagination.style.css";

  export let currentPage: number;
  export let rowData: TableData;

  $: numberOfPages = [
    ...Array(Math.ceil(rowData.length / Constants.ROWS_PER_TABLE)).keys(),
  ];

  const setPage = (event: MouseEvent, page: number): void => {
    event.preventDefault();
    if (page >= 0 && page < numberOfPages.length) {
      currentPage = page;
    }
  };
</script>

<Pagination class="pagination" size="sm">
  <PaginationItem class="pagination-item">
    <PaginationLink
      class="pagination-link"
      first
      on:click={(event) => setPage(event, 0)}
    />
  </PaginationItem>
  <PaginationItem class="pagination-item">
    <PaginationLink
      class="pagination-link"
      previous
      on:click={(event) => setPage(event, currentPage - 1)}
    />
  </PaginationItem>
  {#each numberOfPages as number}
    <PaginationItem class="pagination-item" active={currentPage === number}>
      <PaginationLink
        class="pagination-link"
        on:click={(event) => setPage(event, number)}
        >{number + 1}</PaginationLink
      >
    </PaginationItem>
  {/each}
  <PaginationItem class="pagination-item">
    <PaginationLink
      class="pagination-link"
      next
      on:click={(event) => setPage(event, currentPage + 1)}
    />
  </PaginationItem>
  <PaginationItem class="pagination-item">
    <PaginationLink
      class="pagination-link"
      last
      on:click={(event) => setPage(event, numberOfPages.length - 1)}
    />
  </PaginationItem>
</Pagination>
