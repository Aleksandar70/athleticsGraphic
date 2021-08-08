<script lang="ts">
  import Canvas from "./components/canvas/Canvas.svelte";
  import { onMount } from "svelte";
  import { getResults } from "./api/result.api";
  import "./app.style.css";

  let posts = [];

  onMount(async () => {
    const requestData: IResultParams = { gType: "remote", heat: 1, round: 1 };
    const res = await getResults(requestData);
    posts = res.data;
  });
</script>

<div class="app">
  {#if posts.length === 0}
    <h1>Loading...</h1>
  {:else}
    <Canvas tableData={posts} />
  {/if}
</div>
