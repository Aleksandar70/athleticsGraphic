<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { clearChannel, visibleGraphics } from "../../../stores/stream.store";

  export let data = {};

  const timeline = gsap.timeline();

  onMount(() => {
    timeline
      .to("#scoresBackground", {
        duration: 1,
        opacity: 1,
        scaleX: 1,
        ease: "power2.out",
      })
      .to(
        "#scoresBib",
        { duration: 0.7, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#scoresFlag",
        { duration: 0.5, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#scoresEventName",
        { duration: 0.7, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#scoresCountry",
        { duration: 0.5, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.2"
      )
      .to(
        "#scoresCompetitor",
        { duration: 0.5, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      )
      .to(
        ".metrics",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.15"
      )
      .to(
        ".scores",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.15"
      );
  });

  let clear = false;
  $clearChannel.addEventListener("message", (event) => (clear = event.data));

  $: if (clear) {
    timeline.reverse().then(() => {
      $clearChannel.postMessage(false);
      visibleGraphics.set({ id: "", data: {}, type: undefined });
    });
  }
</script>

<img
  id="scoresBackground"
  alt="score_rounds"
  src="/img/graphics/score_rounds.png"
/>
<p id="scoresEventName">{data["Event Name"]}</p>
<p id="scoresBib">{data["ID"]}</p>
<img id="scoresFlag" alt={data["Flag"]} src="/img/flags/{data['Flag']}.png" />
<p id="scoresCountry">{data["Nationality"]}</p>
<p id="scoresCompetitor">
  {`${data["First Name"]} ${data["Last Name"]}`}
</p>
{#each data["Scores"] as score, i}
  <p class="metrics" id="scoresMetric{i + 1}">
    {Object.keys(score)[0]}
  </p>
  <p class="scores" id="scoresResult{i + 1}">
    {Object.values(score)[0]}
  </p>
{/each}

<style>
  #scoresBackground {
    top: 802px;
    left: 187px;
    position: fixed;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresEventName {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: center;
    width: 310px;
    height: 48px;
    line-height: 48px;
    top: 803px;
    left: 305px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresBib {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 75px;
    height: 48px;
    line-height: 48px;
    top: 865px;
    left: 205px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 867px;
    left: 292px;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 865px;
    left: 343px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresCompetitor {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 865px;
    left: 427px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  .metrics {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 922px;
    color: white;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresMetric1 {
    left: 355px;
  }

  #scoresMetric2 {
    left: 475px;
  }

  #scoresMetric3 {
    left: 595px;
  }

  #scoresMetric4 {
    left: 720px;
  }

  #scoresMetric5 {
    left: 840px;
  }

  #scoresMetric6 {
    left: 960px;
  }

  .scores {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 922px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresResult1 {
    left: 409px;
  }

  #scoresResult2 {
    left: 529px;
  }

  #scoresResult3 {
    left: 649px;
  }

  #scoresResult4 {
    left: 769px;
  }

  #scoresResult5 {
    left: 889px;
  }

  #scoresResult6 {
    left: 1009px;
  }
</style>
