<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { clearChannel, visibleGraphics } from "../../../stores/stream.store";

  export let data;
  export let clear = false;

  $clearChannel.addEventListener("message", (event) => (clear = event.data));
  $: numberOfCompetitors = data["Competitors"].length;

  const timelineHeader = gsap.timeline();
  const timelineCompetitors = gsap.timeline();

  const limitCompetitors = 8;
  let minIndex = 0;
  $: maxIndex = Math.ceil(
    numberOfCompetitors / Math.ceil(numberOfCompetitors / limitCompetitors)
  );

  $: competitorsRange = data["Competitors"].slice(minIndex, maxIndex);

  onMount(() => {
    timelineHeader
      .to("#startnaListaHeader", {
        duration: 0.2,
        opacity: 1,
        scaleY: 1,
        ease: "power2.out",
      })
      .to(
        "#startnaListaNaslov",
        { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#startnaListaDisciplina",
        { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.1"
      )
      .to(
        "#startnaListaHash",
        { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#startnaListaTitle",
        { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      );
    for (let i = 0; i < numberOfCompetitors; i++) {
      timelineCompetitors
        .to(
          `#competitor-info-${i}`,
          {
            duration: 0.15,
            opacity: 1,
            scaleY: 1,
            ease: "power2.out",
          },
          `<0.05`
        )
        .to(
          `#startnaListaPozicija-${i}`,
          {
            duration: 0.15,
            opacity: 1,
            scaleY: 1,
            ease: "power2.out",
          },
          `<0.05`
        )
        .to(
          `#startnaListaImg-${i}`,
          {
            duration: 0.15,
            opacity: 1,
            scaleY: 1,
            ease: "power2.out",
          },
          `<0.05`
        )
        .to(
          `#startnaListaCountry-${i}`,
          {
            duration: 0.15,
            opacity: 1,
            scaleY: 1,
            ease: "power2.out",
          },
          `<0.05`
        )
        .to(
          `#startnaListaIme-${i}`,
          {
            duration: 0.15,
            opacity: 1,
            scaleY: 1,
            ease: "power2.out",
          },
          `<0.05`
        );
    }
  });

  $: if (clear) {
    timelineHeader.reverse().then(() => {
      $clearChannel.postMessage(false);
      visibleGraphics.set({ id: "", data: {}, type: undefined });
    });
  }
</script>

<div id="startnaLista" class="startnaLista">
  <img id="startnaListaHeader" src="/img/graphics/listaHeader.png" alt="" />

  <p id="startnaListaNaslov">{data["Competition"]}</p>
  <p id="startnaListaDisciplina">{data["Event Name"]}</p>
  <p id="startnaListaHash">{data["Hashtag"]}</p>
  <p id="startnaListaTitle">{data["Title"]}</p>

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
      class="startnaListaPozicija"
      id="startnaListaPozicija-{i}"
    >
      {i + 1}
    </p>
    <img
      style="top: {347 + 59 * i}px"
      class="startnaListaImg"
      id="startnaListaImg-{i}"
      src="/img/flags/{competitor.nationality}.png"
      alt={competitor.nationality}
    />
    <p
      style="top: {347 + 59 * i}px"
      class="startnaListaCountry"
      id="startnaListaCountry-{i}"
    >
      {competitor.nationality}
    </p>
    <p
      style="top: {347 + 59 * i}px"
      class="startnaListaIme"
      id="startnaListaIme-{i}"
    >
      {competitor.name}
    </p>
  {/each}
</div>

<style>
  /* START LIST */
  #startnaLista {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #startnaListaHeader {
    top: 212px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #startnaListaTitle {
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

  #startnaListaNaslov {
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

  #startnaListaDisciplina {
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

  #startnaListaHash {
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

  .startnaListaPozicija {
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

  .startnaListaImg {
    position: fixed;
    height: 48px;
    width: 48px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .startnaListaCountry {
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
  .startnaListaIme {
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
