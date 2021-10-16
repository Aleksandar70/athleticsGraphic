<script lang="ts">
  import "./streampage.style.css";
  import { Graphics } from "../../../global/constants/constants";
  import Scores from "./graphics/scores/Score.svelte";
  import EventAnnouncement from "./graphics/event_announcement/EventAnnouncement.svelte";
  import { visibleGraphics } from "../../stores/stream.store";
  import StartList from "./graphics/start_list/StartList.svelte";
  import ResultList from "./graphics/result_list/ResultList.svelte";
  import DisciplineAnnouncement from "./graphics/discipline_announcement/DisciplineAnnouncement.svelte";
  import Medals from "./graphics/medals/Medals.svelte";
  import Time from "./graphics/time/Time.svelte";
  import socket from "../../utils/socket.util";
  import PersonalData from "./graphics/personal_data/PersonalData.svelte";
  import Signature from "./graphics/signature/Signature.svelte";

  socket.on("graphics", (data) => {
    visibleGraphics.set(data);
  });
</script>

<div class="graphics--wrapper">
  {#if $visibleGraphics.id == Graphics.PERSONAL_SCORE}
    <Scores />
  {:else if $visibleGraphics.id == Graphics.EVENT_ANNOUNCEMENT}
    <EventAnnouncement />
  {:else if $visibleGraphics.id == Graphics.START_LIST}
    <StartList />
  {:else if $visibleGraphics.id == Graphics.RESULT_LIST}
    <ResultList />
  {:else if $visibleGraphics.id == Graphics.DISCIPLINE_ANNOUNCEMENT}
    <DisciplineAnnouncement />
  {:else if $visibleGraphics.id == Graphics.MEDALS}
    <Medals />
  {:else if $visibleGraphics.id == Graphics.TIME}
    <Time />
  {:else if $visibleGraphics.id == Graphics.PERSONAL_DATA}
    <PersonalData />
  {:else if $visibleGraphics.id == Graphics.SIGNATURE}
    <Signature />
  {/if}
</div>
