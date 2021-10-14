<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { visibleGraphics } from "../../../stores/stream.store";
  import { animateHeader } from "./resultListAnimation.helper";
  import { Constants } from "../../../../global/constants/constants";
  import socket from "../../../utils/socket.util";

  let clear = false;
  const timelineHeader = gsap.timeline();

  socket.on("clear", () => (clear = true));

  $: numberOfCompetitors = $visibleGraphics?.data?.["Competitors"]?.length;
  $: iterationNumber = Math.ceil(
    numberOfCompetitors / Constants.ROWS_PER_TABLE
  );

  let minIndex = 0;
  $: maxIndex = Math.ceil(numberOfCompetitors / iterationNumber);

  $: competitorsRange =
    $visibleGraphics?.data?.["Competitors"]?.slice(minIndex, maxIndex) ?? [];

  onMount(() => {
    animateHeader(timelineHeader);
    animateCompetitors();
  });

  export const animateCompetitors = () => {
    const timelineCompetitors = gsap.timeline();
    if (minIndex < numberOfCompetitors) {
      for (let index = 0; index < Constants.ROWS_PER_TABLE; index++) {
        timelineCompetitors
          .to(
            `#competitor-info-${index}`,
            {
              duration: 0.15,
              opacity: 1,
              scaleY: 1,
              ease: "power2.out",
            },
            `<0.05`
          )
          .to(
            `#resultListPosition-${index}`,
            {
              duration: 0.15,
              opacity: 1,
              scaleY: 1,
              ease: "power2.out",
            },
            `<0.05`
          )
          .to(
            `#resultListFlag-${index}`,
            {
              duration: 0.15,
              opacity: 1,
              scaleY: 1,
              ease: "power2.out",
            },
            `<0.05`
          )
          .to(
            `#resultListCountry-${index}`,
            {
              duration: 0.15,
              opacity: 1,
              scaleY: 1,
              ease: "power2.out",
            },
            `<0.05`
          )
          .to(
            `#resultListName-${index}`,
            {
              duration: 0.15,
              opacity: 1,
              scaleY: 1,
              ease: "power2.out",
            },
            `<0.05`
          )
          .to(
            `#resultListScore-${index}`,
            {
              duration: 0.15,
              opacity: 1,
              scaleY: 1,
              ease: "power2.out",
            },
            `<0.05`
          );
      }
      gsap.delayedCall(7, () => {
        timelineCompetitors.reverse();
      });
      gsap.delayedCall(10, () => {
        minIndex = maxIndex;
        maxIndex *= 2;
        animateCompetitors();
      });
    } else {
      timelineCompetitors.reverse().then(() => {
        timelineHeader.reverse();
        visibleGraphics.set({ id: "", data: {}, type: undefined, heat: "" });
      });
    }
  };

  $: if (clear) {
    timelineCompetitors.reverse().then(() => {
      timelineHeader.reverse();
      clear = false;
      visibleGraphics.set({ id: "", data: {}, type: undefined, heat: "" });
    });
  }
</script>

<div id="resultList" class="resultList">
  <img
    id="resultListHeader"
    src="/img/graphics/listHeader.png"
    alt="listHeader"
  />

  <p id="resultListCompetitionTitle">{$visibleGraphics.data["Competition"]}</p>
  <p id="resultListDiscipline">
    {#if $visibleGraphics.data["Heat"]}
      {$visibleGraphics.data["Heat"]}
    {/if}
    {$visibleGraphics.data["Event Name"]}
  </p>
  <p id="resultListHash">{$visibleGraphics.data["Hashtag"]}</p>
  <p id="resultListDescription">{$visibleGraphics.data["Description"]}</p>

  {#each competitorsRange as competitor, i}
    <img
      style="top: {347 + 59 * i}px"
      class="competitor-info"
      id="competitor-info-{i}"
      src="/img/graphics/listCompetitor.png"
      alt="listCompetitor"
    />
    <p
      style="top: {347 + 59 * i}px"
      class="resultListPosition"
      id="resultListPosition-{i}"
    >
      {i + minIndex + 1}
    </p>
    <img
      style="top: {347 + 59 * i}px"
      class="resultListFlag"
      id="resultListFlag-{i}"
      src="/img/flags/{competitor.nationality}.png"
      alt={competitor.nationality}
    />
    <p
      style="top: {347 + 59 * i}px"
      class="resultListCountry"
      id="resultListCountry-{i}"
    >
      {competitor.nationality}
    </p>
    <p
      style="top: {347 + 59 * i}px"
      class="resultListName"
      id="resultListName-{i}"
    >
      {competitor.name}
    </p>
    <p
      style="top: {347 + 59 * i}px"
      class="resultListScore"
      id="resultListScore-{i}"
    >
      {competitor.result[$visibleGraphics.heat] ?? competitor.result}
    </p>
  {/each}
</div>

<style>
  /* START LIST */
  #resultList {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #resultListHeader {
    top: 212px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #resultListDescription {
    font-family: "Montserrat-Semibold";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 350px;
    height: 38px;
    line-height: 38px;
    top: 313px;
    left: 1180px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #resultListCompetitionTitle {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 900px;
    height: 56px;
    line-height: 56px;
    top: 193px;
    left: 485px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #resultListDiscipline {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: center;
    width: 375px;
    height: 46px;
    line-height: 46px;
    top: 285px;
    left: 658px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #resultListHash {
    font-family: "Montserrat-MediumItalic";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 300px;
    height: 38px;
    line-height: 38px;
    top: 279px;
    left: 1000px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .competitor-info {
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .resultListPosition {
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

  .resultListFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .resultListCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
  .resultListName {
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
  .resultListScore {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    left: 1320px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
</style>
