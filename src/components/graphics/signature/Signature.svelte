<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { visibleGraphics } from "../../../stores/stream.store";
  import socket from "../../../utils/socket.util";

  export let data;

  let clear = false;

  socket.on("clear", () => (clear = true));
  const timeline = gsap.timeline();

  onMount(() => {
    timeline
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

  $: if (clear) {
    timeline.reverse().then(() => {
      clear = false;
      visibleGraphics.set({ id: "", data: {}, type: undefined, heat: ""  });
    });
  }
</script>

<div id="signature--wrapper">
  <img id="signature" alt="signature" src="/img/graphics/signature.png" />
  <p id="signatureName">{data["Name"]}</p>
  <p id="signatureTitle">{data["Title"]}</p>
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
