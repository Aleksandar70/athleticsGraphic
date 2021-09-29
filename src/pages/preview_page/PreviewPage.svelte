<script lang="ts">
  import { Graphics } from "../../../global/constants/constants";
  import { previewChannel, visiblePreview } from "../../stores/preview.store";
  import DisciplineAnnouncementPreviewPage from "./DisciplineAnnouncementPreviewPage.svelte";
  import EventAnnouncementPreviewPage from "./EventAnnouncementPreviewPage.svelte";

  $previewChannel.addEventListener("message", (event) =>
    visiblePreview.set(event.data)
  );
</script>

<div class="graphics--wrapper">
  {#if $visiblePreview.id == Graphics.DISCIPLINE_ANNOUNCEMENT}
    <DisciplineAnnouncementPreviewPage data={$visiblePreview.data} />
  {:else if $visiblePreview.id == Graphics.EVENT_ANNOUNCEMENT}
    <EventAnnouncementPreviewPage data={$visiblePreview.data} />
  {/if}
</div>
