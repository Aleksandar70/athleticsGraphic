<script lang="ts">
  import { UIText } from "../../../global/constants/ui_text";

  export let result: boolean;

  $: if (result !== undefined) {
    setTimeout(() => (result = undefined), 2000);
  }
</script>

{#if result !== undefined}
  {#if result}
    <span>{UIText.UPDATE_SAVED}</span>
  {:else}
    <span>{UIText.UPDATE_NOT_SAVED}</span>
  {/if}
{/if}
