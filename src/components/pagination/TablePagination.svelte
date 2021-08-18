<script lang="ts">
  import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";
  import "./tablePagination.style.css";

  export let page = 0;
  export let totalPages = [];

  const setPage = (p: number) => {
    if (p >= 0 && p <= totalPages.length) {
      page = p;
      console.log("page1: ", page);
    }
  };
</script>

<Pagination class="pagination-centered" size="sm">
  <PaginationItem>
    <PaginationLink first on:click={() => setPage(1)} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink previous on:click={() => setPage(page - 1)} />
  </PaginationItem>
  {#each totalPages as page, i}
    <PaginationItem>
      <PaginationLink on:click={() => setPage(i + 1)}>{i + 1}</PaginationLink>
    </PaginationItem>
  {/each}
  <PaginationItem>
    <PaginationLink next on:click={() => setPage(page + 1)} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink last on:click={() => setPage(totalPages.length)} />
  </PaginationItem>
</Pagination>
