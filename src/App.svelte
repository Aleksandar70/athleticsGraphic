<script lang="ts">
  import { Router, navigate, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import EventListPage from "./components/pages/event_list_page/EventListPage.svelte";
  import EventCompetitors from "./components/pages/event_competitors_page/EventCompetitorsPage.svelte";
  import Header from "./components/Home/Header.svelte";
  import Footer from "./components/Home/Footer.svelte";
  import { Paths } from "../global/constants/api";

  import "./app.style.css";

  onMount(() => navigate(window.location.pathname));
</script>

<div class="app">
  <Header />
  <Router url={Paths.CLIENT_URL}>
    <Route path={Paths.ROOT_PATH}><EventListPage /></Route>
    <Route path="{Paths.EVENTS_PATH}/:eventId" let:params>
      <EventCompetitors eventId={params.eventId} />
    </Route>
  </Router>
  <Footer />
</div>
