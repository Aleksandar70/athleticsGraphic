<script lang="ts">
  import { Router, navigate, links, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import EventPage from "./components/pages/event_page/EventPage.svelte";
  import ResultPage from "./components/pages/result_page/ResultPage.svelte";

  import "./app.style.css";

  onMount(() => navigate("/"));
</script>

<div class="app" use:links>
  <Router url="http://localhost:5000/">
    <Route path="/"><EventPage /></Route>
    <Route path="/results/:eventId" let:params>
      <ResultPage eventId={params.eventId} />
    </Route>
  </Router>
</div>
