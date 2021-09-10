<script lang="ts">
  import "./streampage.style.css";
  import { Graphics } from "../../../global/constants/constants";
  import ScoreRounds from "../../components/graphics/score_rounds/ScoreRounds.svelte";
  import EventAnnouncement from "../../components/graphics/event_announcement/EventAnnouncement.svelte";

  let graphics: { id: string; data: {} } = { id: "", data: {} };

  const channel = new BroadcastChannel("graphics");
  channel.addEventListener("message", (event) => {
    graphics = event.data;
  });
</script>

<div class="graphics--wrapper">
  {#if graphics.id == Graphics.PERSONAL_SCORE}
    <ScoreRounds data={graphics.data} />
  {:else if graphics.id == Graphics.ANNOUNCEMENT}
    <EventAnnouncement />
  {/if}
</div>
