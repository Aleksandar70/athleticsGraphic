<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { clearChannel, visibleGraphics } from "../../../stores/stream.store";

  export let data;

  let clear = false;

  $clearChannel.addEventListener("message", (event) => (clear = event.data));

  const timeline = gsap.timeline();

  onMount(() => {
    timeline
      .to("#personalDataCompetitorImg", {
        duration: 0.5,
        opacity: 1,
        scaleX: 1,
        ease: "power2.out",
      })
      .to(
        "#personalDataCompetitorID",
        { duration: 0.2, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#personalDataCompetitorFlag",
        { duration: 0.2, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#personalDataCompetitorCountry",
        { duration: 0.2, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#personalDataCompetitorName",
        { duration: 0.2, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#personalDataCompetitorPBImg",
        { duration: 0.25, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#personalDataCompetitorPB",
        { duration: 0.25, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#personalDataCompetitorSBImg",
        { duration: 0.25, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#personalDataCompetitorSB",
        { duration: 0.25, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#personalDataCompetitorAge",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
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

<div id="personalData--wrapper">
  <img
    id="personalDataCompetitorImg"
    alt="personalDataCompetitorImg"
    src="/img/graphics/personalDataCompetitor.png"
  />
  <p id="personalDataCompetitorID">{data["ID"]}</p>
  <img
    id="personalDataCompetitorFlag"
    alt={data["Flag"]}
    src="/img/flags/{data['Flag']}.png"
  />
  <p id="personalDataCompetitorCountry">{data["Nationality"]}</p>
  <p id="personalDataCompetitorName">
    {`${data["First Name"]} ${data["Last Name"]}`}
  </p>
  <img
    id="personalDataCompetitorPBImg"
    alt="personalDataCompetitorPBImg"
    src="/img/graphics/pb.png"
  />
  <p id="personalDataCompetitorPB">{data["Personal Best"]}</p>
  <img
    id="personalDataCompetitorSBImg"
    alt="personalDataCompetitorSBImg"
    src="/img/graphics/sb.png"
  />
  <p id="personalDataCompetitorSB">{data["Season Best"]}</p>
  <p id="personalDataCompetitorAge">Age: {data["Age"]}</p>
</div>

<style>
  #personalData--wrapper {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }
  #personalDataCompetitorImg {
    bottom: 100px;
    left: 30px;
    position: fixed;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }
  #personalDataCompetitorID {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 75px;
    height: 48px;
    line-height: 48px;
    bottom: 250px;
    left: 230px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #personalDataCompetitorFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    bottom: 265px;
    left: 325px;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }
  #personalDataCompetitorCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    bottom: 245px;
    left: 375px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }
  #personalDataCompetitorName {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    bottom: 250px;
    left: 450px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #personalDataCompetitorAge {
    font-family: "Montserrat-SemiBold";
    font-size: 21pt;
    position: fixed;
    text-align: center;
    width: 400px;
    height: 48px;
    line-height: 48px;
    bottom: 195px;
    left: 700px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #personalDataCompetitorPB {
    font-family: "Montserrat-SemiBold";
    font-size: 21pt;
    position: fixed;
    text-align: center;
    width: 75px;
    height: 48px;
    line-height: 48px;
    bottom: 195px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #personalDataCompetitorPBImg {
    position: fixed;
    height: 36px;
    width: 45px;
    bottom: 215px;
    left: 440px;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #personalDataCompetitorSB {
    font-family: "Montserrat-SemiBold";
    font-size: 21pt;
    position: fixed;
    text-align: center;
    width: 75px;
    height: 48px;
    line-height: 48px;
    bottom: 195px;
    left: 700px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #personalDataCompetitorSBImg {
    position: fixed;
    height: 36px;
    width: 45px;
    bottom: 215px;
    left: 650px;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }
</style>
