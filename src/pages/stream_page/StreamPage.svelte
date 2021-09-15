<script lang="ts">
  import "./streampage.style.css";
  import { Graphics } from "../../../global/constants/constants";
  import Scores from "../../components/graphics/scores/Score.svelte";
  import EventAnnouncement from "../../components/graphics/event_announcement/EventAnnouncement.svelte";
  import { streamChannel, visibleGraphics } from "../../stores/stream.store";

  $streamChannel.addEventListener("message", (event) =>
    visibleGraphics.set(event.data)
  );
</script>

<div class="graphics--wrapper">
  {#if $visibleGraphics.id == Graphics.PERSONAL_SCORE}
    <Scores data={$visibleGraphics.data} type={$visibleGraphics.type} />
  {:else if $visibleGraphics.id == Graphics.ANNOUNCEMENT}
    <EventAnnouncement data={$visibleGraphics.data} />
  {/if}
</div>
