<script lang="ts">
  import "./streampage.style.css";
  import { Graphics } from "../../../global/constants/constants";
  import Scores from "../../components/graphics/scores/Score.svelte";
  import EventAnnouncement from "../../components/graphics/event_announcement/EventAnnouncement.svelte";
  import { streamChannel, visibleGraphics } from "../../stores/stream.store";
  import StartList from "../../components/graphics/start_list/StartList.svelte";
  import ResultList from "../../components/graphics/result_list/ResultList.svelte";
  import DisciplineAnnouncement from "../../components/graphics/discipline_announcement/DisciplineAnnouncement.svelte";
  import Time from "../../components/graphics/time/Time.svelte";

  $streamChannel.addEventListener("message", (event) =>
    visibleGraphics.set(event.data)
  );
</script>

<div class="graphics--wrapper">
  {#if $visibleGraphics.id == Graphics.PERSONAL_SCORE}
    <Scores data={$visibleGraphics.data} type={$visibleGraphics.type} />
  {:else if $visibleGraphics.id == Graphics.EVENT_ANNOUNCEMENT}
    <EventAnnouncement data={$visibleGraphics.data} />
  {:else if $visibleGraphics.id == Graphics.START_LIST}
    <StartList data={$visibleGraphics.data} />
  {:else if $visibleGraphics.id == Graphics.RESULT_LIST}
    <ResultList data={$visibleGraphics.data} />
  {:else if $visibleGraphics.id == Graphics.DISCIPLINE_ANNOUNCEMENT}
    <DisciplineAnnouncement
      data={$visibleGraphics.data}
    />{:else if $visibleGraphics.id == Graphics.TIME}
    <Time />
  {/if}
</div>
