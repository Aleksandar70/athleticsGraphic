<script lang="ts">
  import Canvas from "./components/canvas/Canvas.svelte";
  import { fetchData } from "./components/data_table/table.helper";
  import "./app.style.css";
</script>

<div class="app">
  {#await fetchData()}
    <h1>Fetching...</h1>
  {:then tableData}
    <Canvas {tableData} />
  {:catch error}
    <h1>There was some issue fetching data.</h1>
  {/await}
</div>
