<script lang="ts">
  import "./previewpage.style.css";
  import { Graphics } from "../../../global/constants/constants";
  import { previewChannel, visiblePreview } from "../../stores/preview.store";
  import DisciplineAnnouncementPreview from "./non_animation_pages/DisciplineAnnouncementPreview.svelte";
  import EventAnnouncementPreview from "./non_animation_pages/EventAnnouncementPreview.svelte";
  import TimePreview from "./non_animation_pages/TimePreview.svelte";
  import MedalsPreview from "./non_animation_pages/MedalsPreview.svelte";
  import StartListPreview from "./non_animation_pages/StartListPreview.svelte";
  import ResultListPreview from "./non_animation_pages/ResultListPreview.svelte";
  import ScorePreview from "./non_animation_pages/ScorePreview.svelte";
  import PersonalDataPreview from "./non_animation_pages/PersonalDataPreview.svelte";

  $previewChannel.addEventListener("message", (event) => {
    const dataToSet = event.data.modalOpened
      ? event.data
      : {
          id: "",
          data: {},
          type: undefined,
          modalOpened: false,
        };
    visiblePreview.set(dataToSet);
  });
</script>

<div class="preview--wrapper">
  {#if $visiblePreview.id == Graphics.DISCIPLINE_ANNOUNCEMENT}
    <DisciplineAnnouncementPreview />
  {:else if $visiblePreview.id == Graphics.EVENT_ANNOUNCEMENT}
    <EventAnnouncementPreview />
  {:else if $visiblePreview.id == Graphics.START_LIST}
    <StartListPreview />
  {:else if $visiblePreview.id == Graphics.RESULT_LIST}
    <ResultListPreview />
  {:else if $visiblePreview.id == Graphics.MEDALS}
    <MedalsPreview />
  {:else if $visiblePreview.id == Graphics.PERSONAL_SCORE}
    <ScorePreview />
  {:else if $visiblePreview.id == Graphics.TIME}
    <TimePreview />
  {:else if $visiblePreview.id == Graphics.PERSONAL_DATA}
    <PersonalDataPreview />
  {/if}
</div>
