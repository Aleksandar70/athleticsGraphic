<script lang="ts">
  import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";
  import "./tablePagination.style.css";
  import { paginate } from "../data_table/table.helper";
  import type { TableData } from "../../../global/types";

  export let page = 0;
  export let rowData: TableData;
  const paginatedEvents = paginate(rowData);
  export let currentPageRows = paginatedEvents[page]; //page not working
  console.log("page1 ", page);
  let totalPages = [...paginatedEvents];

  $: currentPageRows = totalPages.length > 0 ? totalPages[page] : [];

  const setPage = (p: number) => {
    if (p >= 0 && p < totalPages.length) {
      page = p;
      console.log("page2: ", page);
    }
  };
</script>

<Pagination class="pagination-centered" size="sm">
  <PaginationItem>
    <PaginationLink first on:click={() => setPage(0)} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink previous on:click={() => setPage(page - 1)} />
  </PaginationItem>
  {#each totalPages as page, i}
    <PaginationItem>
      <PaginationLink on:click={() => setPage(i)}>{i + 1}</PaginationLink>
    </PaginationItem>
  {/each}
  <PaginationItem>
    <PaginationLink next on:click={() => setPage(page + 1)} />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink last on:click={() => setPage(totalPages.length - 1)} />
  </PaginationItem>
</Pagination>
