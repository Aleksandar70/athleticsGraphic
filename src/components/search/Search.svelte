<script lang="ts">
  import { Input } from "sveltestrap";
  import type { TableData } from "../../../global/types";
  import { search } from "../search/search.helper";

  export let key: string;
  export let currentPage: number;
  export let rowData: TableData;

  const rows = rowData;

  const doSearch = (target: EventTarget) => {
    currentPage = 0;
    rowData = search((target as HTMLInputElement).value, key, rows);
  };
</script>

<Input
  class="input-search"
  type="search"
  bsSize="sm"
  placeholder="🔎 Search by {key}"
  on:input={(event) => doSearch(event.target)}
/>
