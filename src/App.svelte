<script lang="ts">
  import { Router, navigate, Route } from "svelte-routing";
  import { onMount } from "svelte";
  import EventListPage from "./pages/event_list_page/EventListPage.svelte";
  import EventCompetitorsPage from "./pages/event_competitors_page/EventCompetitorsPage.svelte";
  import StreamPage from "./pages/stream_page/StreamPage.svelte";
  import Header from "./components/header/Header.svelte";
  import Footer from "./components/footer/Footer.svelte";
  import { Paths } from "../global/constants/api";
  import { getConfig } from "./api/config.api";
  import { dataSource } from "./stores/config.store";

  import "./app.style.css";

  onMount(async () => {
    const config = await getConfig();
    dataSource.set(config.dataSource);
    navigate(window.location.pathname);
  });

  const isStream = window.location.pathname === "/stream";
</script>

<Router url={Paths.CLIENT_URL}>
  {#if !isStream}
    <div class="app">
      <section class="header-section">
        <Header />
      </section>
      <main class="main-content">
        <Route path={Paths.ROOT_PATH}><EventListPage /></Route>
        <Route path="{Paths.EVENTS_PATH}/:eventId" let:params>
          <EventCompetitorsPage eventId={params.eventId} />
        </Route>
      </main>
      <section class="footer-section">
        <Footer />
      </section>
    </div>
  {/if}
  <Route path={Paths.STREAM}><StreamPage /></Route>
</Router>
