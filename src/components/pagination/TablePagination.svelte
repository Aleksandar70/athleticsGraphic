<script lang="ts">
  import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";
  import "./tablePagination.style.css";
  import type { TableData } from "../../../global/types";
  import { onMount } from "svelte";
  import { paginate } from "../data_table/table.helper";

  export let page = 0;
  export let rowData: TableData;
  export let currentPageRows = [];
  export let totalPages = [];

  $: currentPageRows = totalPages.length > 0 ? totalPages[page] : [];

  onMount(() => {
    totalPages = [...paginate(rowData)];
  });

  const setPage = (p: number) => {
    if (p >= 0 && p < totalPages.length) {
      page = p;
    }
  };
</script>

<Pagination class="pagination" size="sm">
  <PaginationItem>
    <PaginationLink
      class="pagination-link"
      href="#"
      first
      on:click={() => setPage(0)}
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      class="pagination-link"
      href="#"
      previous
      on:click={() => setPage(page - 1)}
    />
  </PaginationItem>
  {#each totalPages as _totalPage, i}
    <PaginationItem class="pagination-item" active={page === i}>
      <PaginationLink
        class="pagination-link"
        href="#"
        on:click={() => setPage(i)}>{i + 1}</PaginationLink
      >
    </PaginationItem>
  {/each}
  <PaginationItem>
    <PaginationLink
      class="pagination-link"
      href="#"
      next
      on:click={() => setPage(page + 1)}
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      class="pagination-link"
      href="#"
      last
      on:click={() => setPage(totalPages.length - 1)}
    />
  </PaginationItem>
</Pagination>
