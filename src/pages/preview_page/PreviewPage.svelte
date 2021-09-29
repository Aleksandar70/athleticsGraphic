<script lang="ts">
  import { Graphics } from "../../../global/constants/constants";
  import { visibleGraphics } from "../../stores/stream.store";
  import { previewChannel } from "../../stores/preview.store";
  import DisciplineAnnouncementPreviewPage from "./DisciplineAnnouncementPreviewPage.svelte";

  $previewChannel.addEventListener("message", (event) =>
    visibleGraphics.set(event.data)
  );
</script>

<div class="graphics--wrapper">
  {#if $visibleGraphics.id == Graphics.DISCIPLINE_ANNOUNCEMENT}
    <DisciplineAnnouncementPreviewPage data={$visibleGraphics.data} />
  {/if}
</div>
