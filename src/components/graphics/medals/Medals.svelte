<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { clearChannel, visibleGraphics } from "../../../stores/stream.store";

  export let data = {};
  export let clear = false;

  const timeline = gsap.timeline();

  onMount(() => {
    timeline
      .to("#medaljeBG", 0.4, { opacity: 1, scaleY: 1, ease: "power2.out" })
      .to(
        "#medaljeCompetition",
        0.3,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#medaljeHash",
        0.3,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#medaljeEvent",
        0.3,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#medaljeTitle",
        0.3,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<0.05"
      );
  });

  $: if (clear) {
    timeline.reverse().then(() => {
      $clearChannel.postMessage(false);
      visibleGraphics.set({ id: "", data: {}, type: undefined });
    });
  }
</script>

<img id="medaljeBG" src="/img/graphics/medalje.png" alt="" />
<p id="medaljeCompetition">{data["Competition"]}</p>
<p id="medaljeEvent">{data["Event Name"]}</p>
<p id="medaljeHash">{data["Hashtag"]}</p>
<p id="medaljeTitle">{data["Description"]}</p>

<style>
  #medaljeBG {
    top: 666px;
    left: 484px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
  #medaljeCompetition {
    font-family: "Montserrat-Bold";
    font-size: 24pt;
    position: fixed;
    top: 680px;
    left: 615px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
  #medaljeHash {
    font-family: "Montserrat-MediumItalic";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 300px;
    height: 38px;
    line-height: 38px;
    top: 735px;
    left: 980px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
  #medaljeTitle {
    font-family: "Montserrat-Semibold";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 350px;
    height: 38px;
    line-height: 38px;
    top: 765px;
    left: 940px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #medaljeEvent {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: center;
    width: 310px;
    height: 48px;
    line-height: 48px;
    top: 740px;
    left: 695px;
    color: rgb(255, 255, 255);
    z-index: 1;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
</style>
