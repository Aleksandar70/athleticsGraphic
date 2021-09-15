<script lang="ts">
  import "./streampage.style.css";
  import { Graphics } from "../../../global/constants/constants";
  import ScoreRounds from "../../components/graphics/score_rounds/ScoreRounds.svelte";
  import EventAnnouncement from "../../components/graphics/event_announcement/EventAnnouncement.svelte";
  import { streamChannel, visibleGraphics } from "../../stores/stream.store";
  import StartList from "../../components/graphics/start_list/StartList.svelte";
  import Resultlist from "../../components/graphics/result_list/Resultlist.svelte";

  $streamChannel.addEventListener("message", (event) =>
    visibleGraphics.set(event.data)
  );
</script>

<div class="graphics--wrapper">
  {#if $visibleGraphics.id == Graphics.PERSONAL_SCORE}
    <ScoreRounds data={$visibleGraphics.data} />
  {:else if $visibleGraphics.id == Graphics.ANNOUNCEMENT}
    <EventAnnouncement data={$visibleGraphics.data} />
  {:else if $visibleGraphics.id == Graphics.START_LIST}
    <StartList data={$visibleGraphics.data} />
  {:else if $visibleGraphics.id == Graphics.RESULT_LIST}
    <Resultlist data={$visibleGraphics.data} />
  {/if}
</div>
