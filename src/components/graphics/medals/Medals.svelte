<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { clearChannel, visibleGraphics } from "../../../stores/stream.store";
  import { animateHeader } from "./medals.helper";

  export let data = {};
  export let clear = false;
  const timelineHeader = gsap.timeline();
  const timelineCompetitors = gsap.timeline();

  $clearChannel.addEventListener("message", (event) => (clear = event.data));

  $: numberOfBestCompetitors = data["Medals"].length;
  $: bestCompetitors = data["Medals"];

  onMount(() => {
    animateHeader(timelineHeader);
    animateCompetitors();
  });

  export const animateCompetitors = () => {
    for (let index = 0; index < numberOfBestCompetitors; index++) {
      timelineCompetitors
        .to(
          `#medaljePlace-${index}`,
          0.1,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<0.05"
        )
        .to(
          `#medaljeFlag-${index}`,
          0.1,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        )
        .to(
          `#medaljeCountry-${index}`,
          0.1,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        )
        .to(
          `#medaljeTakmicar-${index}`,
          0.1,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        )
        .to(
          `#medaljePerformance-${index}`,
          0.1,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        )
        .to(
          "#medaljeGoldMedal",
          0.1,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        )
        .to(
          "#medaljeSilverMedal",
          0.1,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        )
        .to(
          "#medaljeBronzeMedal",
          0.1,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        );
    }
  };

  $: if (clear) {
    timelineCompetitors.reverse().then(() => {
      timelineHeader.reverse();
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

{#each bestCompetitors as bestCompetitor, i}
  <p style="top: {771 + 59 * i}px" class="medaljePlace" id="medaljePlace-{i}">
    {i + 1}
  </p>

  <img
    style="top: {807 + 65 * i}px"
    class="medaljeFlag"
    id="medaljeFlag-{i}"
    src="/img/flags/{bestCompetitor.nationality}.png"
    alt={bestCompetitor.nationality}
  />

  <p
    style="top: {775 + 58 * i}px"
    class="medaljeCountry"
    id="medaljeCountry-{i}"
  >
    {bestCompetitor.nationality}
  </p>
  <p
    style="top: {778 + 58 * i}px"
    class="medaljeTakmicar"
    id="medaljeTakmicar-{i}"
  >
    {bestCompetitor.name}
  </p>
  <p
    style="top: {778 + 58 * i}px"
    class="medaljePerformance"
    id="medaljePerformance-{i}"
  >
    {bestCompetitor.result}
  </p>

  {#if i == 0}
    <img id="medaljeGoldMedal" src="/img/graphics/goldMedal.png" alt="" />
  {:else if i == 1}
    <img id="medaljeSilverMedal" src="/img/graphics/silverMedal.png" alt="" />
  {:else}
    <img id="medaljeBronzeMedal" src="/img/graphics/bronzeMedal.png" alt="" />
  {/if}
{/each}

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

  #medaljeGoldMedal {
    position: fixed;
    width: 35px;
    height: 46px;
    top: 807px;
    left: 1370px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #medaljeSilverMedal {
    position: fixed;
    width: 35px;
    height: 46px;
    top: 865px;
    left: 1370px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #medaljeBronzeMedal {
    position: fixed;
    width: 35px;
    height: 46px;
    top: 922px;
    left: 1370px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .medaljePlace {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .medaljeFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .medaljeCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    left: 645px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .medaljeTakmicar {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .medaljePerformance {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    right: 550px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
</style>
