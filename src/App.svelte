<script lang="ts">
  import { Router, navigate, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import EventPage from "./components/pages/event_page/EventPage.svelte";
  import ResultPage from "./components/pages/result_page/ResultPage.svelte";
  import Header from "./components/Home/Header.svelte";
  import Footer from "./components/Home/Footer.svelte";

  import "./app.style.css";

  onMount(() => navigate("/"));
</script>

<div class="app">
  <Header />
  <Router url="http://localhost:5000/">
    <Route path="/"><EventPage /></Route>
    <Route path="/results/:eventId" let:params>
      <ResultPage eventId={params.eventId} />
    </Route>
  </Router>
  <Footer />
</div>
