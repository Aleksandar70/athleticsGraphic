<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { clearChannel, visibleGraphics } from "../../../stores/stream.store";

  export let data;
  let clear = false;

  const timeline = gsap.timeline();

  $clearChannel.addEventListener("message", (event) => (clear = event.data));

  $: numberOfBestCompetitors = data["Medals"].length;
  $: bestCompetitors = data["Medals"];

  onMount(() => {
    for (let index = 0; index < numberOfBestCompetitors; index++) {
      timeline
        .to("#medalsBG", {
          duration: 0.2,
          opacity: 1,
          scaleY: 1,
          ease: "power2.out",
        })
        .to(
          "#medalsCompetition",
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          "<.03"
        )
        .to(
          "#medalsHash",
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          "<.03"
        )
        .to(
          "#medalsEvent",
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          "<.03"
        )
        .to(
          "#medalsTitle",
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          "<.03"
        )
        .to(
          `#medalsPlace-${index}`,
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          `<0.03`
        )
        .to(
          `#medalsFlag-${index}`,
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          `<0.03`
        )
        .to(
          `#medalsCountry-${index}`,
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          `<0.03`
        )
        .to(
          `#medalsCompetitor-${index}`,
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          `<0.03`
        )
        .to(
          `#medalsPerformance-${index}`,
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          `<0.03`
        )
        .to(
          `#medalsMedal-${index}`,
          { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
          `<0.03`
        );
    }
  });

  $: if (clear) {
    timeline.reverse().then(() => {
      $clearChannel.postMessage(false);
      visibleGraphics.set({ id: "", data: {}, type: undefined, heat: "" });
    });
  }
</script>

<div id="medals" class="medals">
  <img id="medalsBG" src="/img/graphics/medals.png" alt="medals" />

  <p id="medalsCompetition">{data["Competition"]}</p>
  <p id="medalsEvent">{data["Event Name"]}</p>
  <p id="medalsHash">{data["Hashtag"]}</p>
  <p id="medalsTitle">{data["Description"]}</p>

  {#each bestCompetitors as bestCompetitor, i}
    <p style="top: {805 + 59 * i}px" class="medalsPlace" id="medalsPlace-{i}">
      {i + 1}
    </p>
    <img
      style="top: {805 + 59 * i}px"
      class="medalsFlag"
      id="medalsFlag-{i}"
      src="/img/flags/{bestCompetitor.nationality}.png"
      alt={bestCompetitor.nationality}
    />
    <p
      style="top: {805 + 58 * i}px"
      class="medalsCountry"
      id="medalsCountry-{i}"
    >
      {bestCompetitor.nationality}
    </p>
    <p
      style="top: {805 + 58 * i}px"
      class="medalsCompetitor"
      id="medalsCompetitor-{i}"
    >
      {bestCompetitor.name}
    </p>
    <p
      style="top: {805 + 58 * i}px"
      class="medalsPerformance"
      id="medalsPerformance-{i}"
    >
      {bestCompetitor.result["Final"] ?? bestCompetitor.result["single"]}
    </p>
    <p style="top: {805 + 58 * i}px" class="medalsMedal" id="medalsMedal-{i}">
      {#if i == 0}
        <img
          id="medalsMedal-{i}"
          src="/img/graphics/goldMedal.png"
          alt="goldMedal"
        />
      {:else if i == 1}
        <img
          id="medalsMedal-{i}"
          src="/img/graphics/silverMedal.png"
          alt="silverMedal"
        />
      {:else}
        <img
          id="medalsMedal-{i}"
          src="/img/graphics/bronzeMedal.png"
          alt="bronzeMedal"
        />
      {/if}
    </p>
  {/each}
</div>

<style>
  #medals {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  #medalsBG {
    top: 666px;
    left: 484px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
  #medalsCompetition {
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
  #medalsHash {
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
  #medalsTitle {
    font-family: "Montserrat-Semibold";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 350px;
    height: 38px;
    line-height: 38px;
    top: 770px;
    left: 940px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #medalsEvent {
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

  .medalsMedal {
    position: fixed;
    width: 35px;
    height: 46px;
    top: 807px;
    left: 1370px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .medalsPlace {
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

  .medalsFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .medalsCountry {
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

  .medalsCompetitor {
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

  .medalsPerformance {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 100px;
    height: 48px;
    line-height: 48px;
    left: 1250px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
</style>
