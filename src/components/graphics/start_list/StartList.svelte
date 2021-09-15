<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { clearChannel, visibleGraphics } from "../../../stores/stream.store";

  export let data;
  export let clear = false;

  $clearChannel.addEventListener("message", (event) => (clear = event.data));

  const timeline = gsap.timeline();
  const numberOfCompetitors = data.length;

  onMount(() => {
    timeline
      .to("#startnaListaHeader", 0.2, {
        opacity: 1,
        scaleY: 1,
        ease: "power2.out",
      })
      .to(
        "#startnaListaNaslov",
        0.15,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#startnaListaDisciplina",
        0.15,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.1"
      )
      .to(
        "#startnaListaHash",
        0.15,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      );

    for (let i = 0; i < numberOfCompetitors; i++) {
      tl.to("#startnaListaTakmicar", 0.15, {
        opacity: 1,
        scaleY: 1,
        ease: "power2.out",
      })
        .to(
          "#startnaListaPozicija",
          0.15,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        )
        .to(
          "#startnaListaImg",
          0.15,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        )
        .to(
          "#startnaListaCountry",
          0.15,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
        )
        .to(
          "#startnaListaIme",
          0.15,
          { opacity: 1, scaleY: 1, ease: "power2.out" },
          "<"
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

<div id="startnaLista" class="startnaLista">
  <img id="startnaListaHeader" src="/img/graphics/listaHeader.png" alt="" />
  <img
    id="startnaListaTakmicar"
    src="/img/graphics/listaTakmicar.png"
    alt=""
  />

  <p id="startnaListaNaslov">{data["Competition"]}</p>
  <p id="startnaListaDisciplina">{data["Event Name"]}</p>
  <p id="startnaListaHash">{data["Hashtag"]}</p>
  <p id="startnaListaTitle">{data["Title"]}</p>

  <p id="startnaListaPozicija" />
  <img id="startnaListaImg" src="" alt="" />
  <p id="startnaListaCountry" />
  <p id="startnaListaIme" />
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
    top: 292px;
    left: 1135px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #startnaListaTakmicar {
    top: 347px;
    left: 485px;
    position: fixed;
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
    top: 260px;
    left: 1000px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #startnaListaPozicija {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 317px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #startnaListaImg {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 352px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #startnaListaCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 321px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
  #startnaListaIme {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 324px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
</style>
