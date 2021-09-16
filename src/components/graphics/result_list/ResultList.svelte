<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { clearChannel, visibleGraphics } from "../../../stores/stream.store";

  export let data;
  export let clear = false;

  $clearChannel.addEventListener("message", (event) => (clear = event.data));

  const timeline = gsap.timeline();
  $: numberOfCompetitors = data["Competitors"].length;

  onMount(() => {
    timeline
      .to("#resultListaHeader", {
        duration: 0.2,
        opacity: 1,
        scaleY: 1,
        ease: "power2.out",
      })
      .to(
        "#resultListaNaslov",
        { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#resultListaDisciplina",
        { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.1"
      )
      .to(
        "#resultListaHash",
        { duration: 0.15, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      );

    for (let i = 0; i < numberOfCompetitors; i++) {
      timeline
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
          `#resultListaPozicija-${i}`,
          {
            duration: 0.15,
            opacity: 1,
            scaleY: 1,
            ease: "power2.out",
          },
          `<0.05`
        )
        .to(
          `#resultListaImg-${i}`,
          {
            duration: 0.15,
            opacity: 1,
            scaleY: 1,
            ease: "power2.out",
          },
          `<0.05`
        )
        .to(
          `#resultListaCountry-${i}`,
          {
            duration: 0.15,
            opacity: 1,
            scaleY: 1,
            ease: "power2.out",
          },
          `<0.05`
        )
        .to(
          `#resultListaIme-${i}`,
          {
            duration: 0.15,
            opacity: 1,
            scaleY: 1,
            ease: "power2.out",
          },
          `<0.05`
        )
        .to(
          `#resultListaResult-${i}`,
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
    timeline.reverse().then(() => {
      $clearChannel.postMessage(false);
      visibleGraphics.set({ id: "", data: {}, type: undefined });
    });
  }
</script>

<div id="resultLista" class="resultLista">
  <img id="resultListaHeader" src="/img/graphics/listaHeader.png" alt="" />

  <p id="resultListaNaslov">{data["Competition"]}</p>
  <p id="resultListaDisciplina">{data["Event Name"]}</p>
  <p id="resultListaHash">{data["Hashtag"]}</p>
  <p id="resultListaTitle">{data["Title"]}</p>

  {#each data["Competitors"] as competitor, i}
    <img
      style="top: {347 + 59 * i}px"
      class="competitor-info"
      id="competitor-info-{i}"
      src="/img/graphics/listaTakmicar.png"
      alt="listaTakmicar"
    />
    <p
      style="top: {347 + 59 * i}px"
      class="resultListaPozicija"
      id="resultListaPozicija-{i}"
    >
      {i + 1}
    </p>
    <img
      style="top: {347 + 59 * i}px"
      class="resultListaImg"
      id="resultListaImg-{i}"
      src="/img/flags/{competitor.nationality}.png"
      alt={competitor.nationality}
    />
    <p
      style="top: {347 + 59 * i}px"
      class="resultListaCountry"
      id="resultListaCountry-{i}"
    >
      {competitor.nationality}
    </p>
    <p
      style="top: {347 + 59 * i}px"
      class="resultListaIme"
      id="resultListaIme-{i}"
    >
      {competitor.name}
    </p>
    <p
      style="top: {347 + 59 * i}px"
      class="resultListaResult"
      id="resultListaResult-{i}"
    >
      {competitor.result}
    </p>
  {/each}
</div>

<style>
  /* START LIST */
  #resultLista {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #resultListaHeader {
    top: 212px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #resultListaTitle {
    font-family: "Montserrat-Semibold";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 350px;
    height: 38px;
    line-height: 38px;
    top: 292px;
    left: 1135px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #resultListaNaslov {
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

  #resultListaDisciplina {
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

  #resultListaHash {
    font-family: "Montserrat-MediumItalic";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 300px;
    height: 38px;
    line-height: 38px;
    top: 260px;
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

  .resultListaPozicija {
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

  .resultListaImg {
    position: fixed;
    height: 48px;
    width: 48px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  .resultListaCountry {
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
  .resultListaIme {
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
  .resultListaResult {
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
