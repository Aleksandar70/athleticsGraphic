<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { clearChannel, visibleGraphics } from "../../../stores/stream.store";
  import { animateHeader } from "./startListAnimation.helper";

  export let data;
  export let clear = false;
  const limitCompetitors = 8;
  const timelineHeader = gsap.timeline();

  $clearChannel.addEventListener("message", (event) => (clear = event.data));
  $: numberOfCompetitors = data["Competitors"].length;
  $: iterationNumber = Math.ceil(numberOfCompetitors / limitCompetitors);

  let minIndex = 0;
  $: maxIndex = Math.ceil(numberOfCompetitors / iterationNumber);

  $: competitorsRange = data["Competitors"].slice(minIndex, maxIndex);

  onMount(() => {
    animateHeader(timelineHeader);
    animateCompetitors();
  });

  export const animateCompetitors = () => {
    const timelineCompetitors = gsap.timeline();
    if (minIndex < numberOfCompetitors) {
      for (let index = 0; index < limitCompetitors; index++) {
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
            `#startListPosition-${index}`,
            {
              duration: 0.15,
              opacity: 1,
              scaleY: 1,
              ease: "power2.out",
            },
            `<0.05`
          )
          .to(
            `#startListFlag-${index}`,
            {
              duration: 0.15,
              opacity: 1,
              scaleY: 1,
              ease: "power2.out",
            },
            `<0.05`
          )
          .to(
            `#startListCountry-${index}`,
            {
              duration: 0.15,
              opacity: 1,
              scaleY: 1,
              ease: "power2.out",
            },
            `<0.05`
          )
          .to(
            `#startListName-${index}`,
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
        visibleGraphics.set({ id: "", data: {}, type: undefined });
      });
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

<div id="startList" class="startList">
  <img id="startListHeader" src="/img/graphics/listaHeader.png" alt="" />
  <p id="startListCompetitonTitle">{data["Competition"]}</p>
  <p id="startListDiscipline">{data["Event Name"]}</p>
  <p id="startListHash">{data["Hashtag"]}</p>
  <p id="startListDescription">{data["Description"]}</p>

  {#each competitorsRange as competitor, i}
    <img
      style="top: {347 + 59 * i}px"
      class="competitor-info"
      id="competitor-info-{i}"
      src="/img/graphics/listaTakmicar.png"
      alt="listaTakmicar"
    />
    <p
      style="top: {347 + 59 * i}px"
      class="startListPosition"
      id="startListPosition-{i}"
    >
      {i + minIndex + 1}
    </p>
    <img
      style="top: {347 + 59 * i}px"
      class="startListFlag"
      id="startListFlag-{i}"
      src="/img/flags/{competitor.nationality}.png"
      alt={competitor.nationality}
    />
    <p
      style="top: {347 + 59 * i}px"
      class="startListCountry"
      id="startListCountry-{i}"
    >
      {competitor.nationality}
    </p>
    <p
      style="top: {347 + 59 * i}px"
      class="startListName"
      id="startListName-{i}"
    >
      {competitor.name}
    </p>
  {/each}
</div>

<style>
  /* START LIST */
  #startList {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #startListHeader {
    top: 212px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #startListDescription {
    font-family: "Montserrat-Semibold";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 350px;
    height: 38px;
    line-height: 38px;
    top: 313px;
    left: 980px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #startListCompetitonTitle {
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

  #startListDiscipline {
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

  #startListHash {
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

  .startListPosition {
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

  .startListFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .startListCountry {
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
  .startListName {
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
</style>
