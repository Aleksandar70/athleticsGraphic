<script lant="ts">
  import { onMount } from "svelte";
  import { timeline, visibleGraphics } from "../../../stores/stream.store";

  onMount(() => {
    $timeline
      .to("#signature", {
        duration: 0.5,
        opacity: 1,
        scaleX: 1,
        ease: "power2.out",
      })
      .to(
        "#signatureName",
        { duration: 0.3, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#signatureTitle",
        { duration: 0.3, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      );
  });
</script>

<div id="signature--wrapper">
  <img id="signature" alt="signature" src="/img/graphics/signature.png" />
  {#if $visibleGraphics.data["Name"]}
    <p id="signatureName">{$visibleGraphics.data["Name"]}</p>
  {/if}
  {#if $visibleGraphics.data["Name"]}
    <p id="signatureTitle">{$visibleGraphics.data["Title"]}</p>
  {/if}
</div>

<style>
  #signature--wrapper {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  #signature {
    top: 868px;
    left: 585px;
    position: fixed;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #signatureName {
    font-family: "Montserrat-SemiBold";
    font-size: 25pt;
    position: fixed;
    text-align: center;
    width: 1000px;
    height: 48px;
    line-height: 48px;
    top: 870px;
    left: 501px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #signatureTitle {
    font-family: "Montserrat-SemiBold";
    font-size: 21pt;
    position: fixed;
    text-align: center;
    width: 1000px;
    height: 48px;
    line-height: 48px;
    top: 920px;
    left: 503px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }
</style>
