<script lang="ts">
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
      .to("#rezultatiListaHeader", 0.2, {
        opacity: 1,
        scaleY: 1,
        ease: "power2.out",
      })
      .to(
        "#rezultatiListaNaslov",
        0.15,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#rezultatiListaDisciplina",
        0.15,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.1"
      )
      .to(
        "#rezultatiListaHash",
        0.15,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#rezultatiListaTitle",
        0.15,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      );
  });

  $: if (clear) {
    timeline.reverse().then(() => {
      $clearChannel.postMessage(false);
      visibleGraphics.set({ id: "", data: {} });
    });
  }
</script>

<div id="rezultatiLista" class="rezultatiLista">
  <img id="rezultatiListaHeader" src="/img/listaHeader.png" alt="" />
  <img id="rezultatiListaTakmicar1" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar2" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar3" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar4" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar5" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar6" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar7" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar8" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar9" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar10" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar11" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar12" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar13" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar14" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar15" src="/img/listaTakmicar.png" alt="" />
  <img id="rezultatiListaTakmicar16" src="/img/listaTakmicar.png" alt="" />
  <p id="rezultatiListaNaslov">{data["Competition"]}</p>
  <p id="rezultatiListaDisciplina" />
  <p id="rezultatiListaHash">{data["Hashtag"]}</p>
  <p id="rezultatiListaTitle">{data["Title"]}</p>

  <p id="rezultatiListaPozicija1" />
  <img id="rezultatiListaImg1" src="" alt="" />
  <p id="rezultatiListaCountry1" />
  <p id="rezultatiListaIme1" />
  <p id="rezultatiListaRezultat1" />

  <p id="rezultatiListaPozicija2" />
  <img id="rezultatiListaImg2" src="" alt="" />
  <p id="rezultatiListaCountry2" />
  <p id="rezultatiListaIme2" />
  <p id="rezultatiListaRezultat2" />

  <p id="rezultatiListaPozicija3" />
  <img id="rezultatiListaImg3" src="" alt="" />
  <p id="rezultatiListaCountry3" />
  <p id="rezultatiListaIme3" />
  <p id="rezultatiListaRezultat3" />

  <p id="rezultatiListaPozicija4" />
  <img id="rezultatiListaImg4" src="" alt="" />
  <p id="rezultatiListaCountry4" />
  <p id="rezultatiListaIme4" />
  <p id="rezultatiListaRezultat4" />

  <p id="rezultatiListaPozicija5" />
  <img id="rezultatiListaImg5" src="" alt="" />
  <p id="rezultatiListaCountry5" />
  <p id="rezultatiListaIme5" />
  <p id="rezultatiListaRezultat5" />

  <p id="rezultatiListaPozicija6" />
  <img id="rezultatiListaImg6" src="" alt="" />
  <p id="rezultatiListaCountry6" />
  <p id="rezultatiListaIme6" />
  <p id="rezultatiListaRezultat6" />

  <p id="rezultatiListaPozicija7" />
  <img id="rezultatiListaImg7" src="" alt="" />
  <p id="rezultatiListaCountry7" />
  <p id="rezultatiListaIme7" />
  <p id="rezultatiListaRezultat7" />

  <p id="rezultatiListaPozicija8" />
  <img id="rezultatiListaImg8" src="" alt="" />
  <p id="rezultatiListaCountry8" />
  <p id="rezultatiListaIme8" />
  <p id="rezultatiListaRezultat8" />

  <p id="rezultatiListaPozicija9" />
  <img id="rezultatiListaImg9" src="" alt="" />
  <p id="rezultatiListaCountry9" />
  <p id="rezultatiListaIme9" />
  <p id="rezultatiListaRezultat9" />

  <p id="rezultatiListaPozicija10" />
  <img id="rezultatiListaImg10" src="" alt="" />
  <p id="rezultatiListaCountry10" />
  <p id="rezultatiListaIme10" />
  <p id="rezultatiListaRezultat10" />

  <p id="rezultatiListaPozicija11" />
  <img id="rezultatiListaImg11" src="" alt="" />
  <p id="rezultatiListaCountry11" />
  <p id="rezultatiListaIme11" />
  <p id="rezultatiListaRezultat11" />

  <p id="rezultatiListaPozicija12" />
  <img id="rezultatiListaImg12" src="" alt="" />
  <p id="rezultatiListaCountry12" />
  <p id="rezultatiListaIme12" />
  <p id="rezultatiListaRezultat12" />

  <p id="rezultatiListaPozicija13" />
  <img id="rezultatiListaImg13" src="" alt="" />
  <p id="rezultatiListaCountry13" />
  <p id="rezultatiListaIme13" />
  <p id="rezultatiListaRezultat13" />

  <p id="rezultatiListaPozicija14" />
  <img id="rezultatiListaImg14" src="" alt="" />
  <p id="rezultatiListaCountry14" />
  <p id="rezultatiListaIme14" />
  <p id="rezultatiListaRezultat14" />

  <p id="rezultatiListaPozicija15" />
  <img id="rezultatiListaImg15" src="" alt="" />
  <p id="rezultatiListaCountry15" />
  <p id="rezultatiListaIme15" />
  <p id="rezultatiListaRezultat15" />

  <p id="rezultatiListaPozicija16" />
  <img id="rezultatiListaImg16" src="" alt="" />
  <p id="rezultatiListaCountry16" />
  <p id="rezultatiListaIme16" />
  <p id="rezultatiListaRezultat16" />
</div>

<style>
  /* RESULTS LIST */
  #rezultatiLista {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #rezultatiListaHeader {
    top: 212px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTitle {
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

  #rezultatiListaTakmicar1 {
    top: 347px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar9 {
    top: 347px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar2 {
    top: 406px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar10 {
    top: 406px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar3 {
    top: 465px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar11 {
    top: 465px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar4 {
    top: 524px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar12 {
    top: 524px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar5 {
    top: 583px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar13 {
    top: 583px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar6 {
    top: 642px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar14 {
    top: 642px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar7 {
    top: 701px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar15 {
    top: 701px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar8 {
    top: 760px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaTakmicar16 {
    top: 760px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaNaslov {
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

  #rezultatiListaDisciplina {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: center;
    width: 375px;
    height: 46px;
    line-height: 46px;
    top: 260px;
    left: 658px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaHash {
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

  #rezultatiListaPozicija1 {
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

  #rezultatiListaPozicija2 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 376px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija3 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 435px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija4 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 494px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija5 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 553px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija6 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 612px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija7 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 671px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija8 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 730px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija9 {
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

  #rezultatiListaPozicija10 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 376px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija11 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 435px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija12 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 494px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija13 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 553px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija14 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 612px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija15 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 671px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaPozicija16 {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    top: 730px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg1 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 352px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg2 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 411px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg3 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 470px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg4 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 529px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg5 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 588px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg6 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 647px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg7 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 706px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg8 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 765px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg9 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 352px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg10 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 411px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg11 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 470px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg12 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 529px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg13 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 588px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg14 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 647px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg15 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 706px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaImg16 {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 765px;
    left: 590px;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry1 {
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

  #rezultatiListaCountry2 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 380px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry3 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 439px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry4 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 498px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry5 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 557px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry6 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 616px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry7 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 675px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry8 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 734px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry9 {
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

  #rezultatiListaCountry10 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 380px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry11 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 439px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry12 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 498px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry13 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 557px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry14 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 616px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry15 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 675px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaCountry16 {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 734px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme1 {
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

  #rezultatiListaIme2 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 383px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme3 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 442px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme4 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 501px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme5 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 560px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme6 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 619px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme7 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 678px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme8 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 737px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme9 {
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

  #rezultatiListaIme10 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 383px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme11 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 442px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme12 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 501px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme13 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 560px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme14 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 619px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme15 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 678px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaIme16 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 737px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat1 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 324px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat9 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 324px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat2 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 383px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat10 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 383px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat3 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 442px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat11 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 442px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat4 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 501px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat12 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 501px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat5 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 560px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat13 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 560px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat6 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 619px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat14 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 619px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat7 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 678px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat15 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 678px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat8 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 737px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #rezultatiListaRezultat16 {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 737px;
    right: 525px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
</style>
