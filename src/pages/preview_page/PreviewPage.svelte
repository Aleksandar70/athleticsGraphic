<script lang="ts">
  import "./previewpage.style.css";
  import { Graphics } from "../../../global/constants/constants";
  import { visiblePreview } from "../../stores/preview.store";
  import DisciplineAnnouncementPreview from "./graphics/DisciplineAnnouncementPreview.svelte";
  import EventAnnouncementPreview from "./graphics/EventAnnouncementPreview.svelte";
  import TimePreview from "./graphics/TimePreview.svelte";
  import MedalsPreview from "./graphics/MedalsPreview.svelte";
  import StartListPreview from "./graphics/StartListPreview.svelte";
  import ResultListPreview from "./graphics/ResultListPreview.svelte";
  import ScorePreview from "./graphics/ScorePreview.svelte";
  import PersonalDataPreview from "./graphics/PersonalDataPreview.svelte";
  import SignaturePreview from "./graphics/SignaturePreview.svelte";
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
  {:else if $visiblePreview.id == Graphics.SIGNATURE}
    <SignaturePreview />
  {/if}
</div>
