<script lang="ts">
  import Canvas from "./components/canvas/Canvas.svelte";
  import { onMount } from "svelte";
  import { getResults } from "./api/result.api";
  import type { IResultParams } from "../backend/src/api/interfaces/interfaces";
  import "./app.style.css";
  import Header from "./components/Home/Header.svelte";
  import Footer from "./components/Home/Footer.svelte";

  let posts: Record<string, unknown>[] = [];

  onMount(async () => {
    const requestData: IResultParams = { gType: "remote", heat: 1, round: 1 };
    posts = await getResults(requestData);
  });
</script>

<Header />
<div class="app">
  {#if posts.length === 0}
    <h1>Loading...</h1>
  {:else}
    <Canvas tableData={posts} />
  {/if}
</div>
<Footer/>
