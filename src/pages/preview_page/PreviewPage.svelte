<script lang="ts">
  import "./previewpage.style.css";
  import { Graphics } from "../../../global/constants/constants";
  import { previewChannel, visiblePreview } from "../../stores/preview.store";
  import DisciplineAnnouncementPreviewPage from "./DisciplineAnnouncementPreviewPage.svelte";
  import EventAnnouncementPreviewPage from "./EventAnnouncementPreviewPage.svelte";
  import TimePreviewPage from "./TimePreviewPage.svelte";
  import MedalsPreviewPage from "./MedalsPreviewPage.svelte";
  import StartListPreviewPage from "./StartListPreviewPage.svelte";
  import ResultListPreviewPage from "./ResultListPreviewPage.svelte";
  import ScorePreviewPage from "./ScorePreviewPage.svelte";

  $previewChannel.addEventListener("message", (event) =>
    visiblePreview.set(event.data)
  );
</script>

<div class="graphics--wrapper">
  {#if $visiblePreview.id == Graphics.DISCIPLINE_ANNOUNCEMENT}
    <DisciplineAnnouncementPreviewPage data={$visiblePreview.data} />
  {:else if $visiblePreview.id == Graphics.EVENT_ANNOUNCEMENT}
    <EventAnnouncementPreviewPage data={$visiblePreview.data} />
  {:else if $visiblePreview.id == Graphics.START_LIST}
    <StartListPreviewPage data={$visiblePreview.data} />
  {:else if $visiblePreview.id == Graphics.RESULT_LIST}
    <ResultListPreviewPage data={$visiblePreview.data} />
  {:else if $visiblePreview.id == Graphics.MEDALS}
    <MedalsPreviewPage data={$visiblePreview.data} />
  {:else if $visiblePreview.id == Graphics.PERSONAL_SCORE}
    <ScorePreviewPage data={$visiblePreview.data} type={$visiblePreview.type} />
  {:else if $visiblePreview.id == Graphics.TIME}
    <TimePreviewPage />
  {/if}
</div>
