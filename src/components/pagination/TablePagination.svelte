<script lang="ts">
  import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";
  import "./tablePagination.style.css";

  let rows = [];
  let page = 0;
  let totalPages = [];
  let currentPageRows = [];
  let itemsPerPage = 5;
  let loading = true;

  $: currentPageRows = totalPages.length > 0 ? totalPages[page] : [];
  const setPage = async (page) => {
    if (page >= 0 && page < totalPages.length) {
    }
  };

  const paginate = (items) => {
    const pages = Math.ceil(items.length / itemsPerPage);

    const paginatedItems = Array.from({ length: pages }, (_, index) => {
      const start = index * itemsPerPage;
      return items.slice(start, start + itemsPerPage);
    });

    console.log("paginatedItems are", paginatedItems);
    totalPages = [...paginatedItems];
    currentPageRows = paginatedItems[page];
  };
</script>

<Pagination class="pagination-centered" size="sm">
  <PaginationItem>
    <PaginationLink first on:click={() => setPage(page)} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink previous on:click={() => setPage(page - 1)} />
  </PaginationItem>
  {#each totalPages as page, i}
    <PaginationItem>
      <PaginationLink>{i + 1}</PaginationLink>
    </PaginationItem>
  {/each}
  <PaginationItem>
    <PaginationLink next on:click={() => setPage(page + 1)} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink last on:click={() => setPage(page)} />
  </PaginationItem>
</Pagination>
