<script lang="ts">
  import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";
  import "./tablePagination.style.css";
  import { onMount } from "svelte";
  import { Constants } from "../../../global/constants/constants";
  import { getEventData } from "../../api/event.api";

  let rows = [];
  let page = 0;
  let totalPages = [];
  let currentPageRows = [];
  let eventsPerPage = Constants.ROWS_PER_TABLE;
  let tableData = [];

  $: currentPageRows = totalPages.length > 0 ? totalPages[page] : [];

  //2
  const paginate = (events) => {
    const pages = Math.ceil(events.length / eventsPerPage);
    const paginatedEvents = Array.from({ length: pages }, (_, index) => {
      const start = index * eventsPerPage;
      return events.slice(start, start + eventsPerPage);
    });

    totalPages = [...paginatedEvents];
    currentPageRows = paginatedEvents[page];
  };
  //1
  onMount(async () => {
    tableData = await getEventData();
    rows = Array.from({ length: tableData.length }, (_, i) => {
      tableData;
    });
    paginate(rows);
  });

  const setPage = (p: number) => {
    if (p >= 0 && p <= totalPages.length) {
      page = p;
      console.log("page: ", page);
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
