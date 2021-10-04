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
        scaleY: 1,
        ease: "power2.out",
      })
      .to(
        "#personalDataCompetitorID",
        { duration: 0.5, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#personalDataCompetitorFlag",
        { duration: 0.3, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
      )
      .to(
        "#personalDataCompetitorCountry",
        { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.1"
      )
      .to(
        "#personalDataCompetitorName",
        { duration: 0.5, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#personalDataCompetitorPB",
        { duration: 0.3, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
      )
      .to(
        "#personalDataCompetitorAge",
        { duration: 0.3, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
      )
      .to(
        "#personalDataCompetitorPBImg",
        { duration: 0.3, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
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
  <p id="personalDataCompetitorAge">{data["Age"]}</p>
  <p id="personalDataCompetitorPB">100</p>
  <img
    id="personalDataCompetitorPBImg"
    alt="personalDataCompetitorPBImg"
    src="/img/graphics/pb.png"
  />
</div>

<style>
  #personalData--wrapper {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  #personalDataCompetitorImg {
    top: 863px;
    left: 189px;
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
    top: 836px;
    left: 206px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #personalDataCompetitorFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 866px;
    left: 292px;
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
    top: 837px;
    left: 341px;
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
    top: 837px;
    left: 427px;
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
    top: 890px;
    left: 650px;
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
    top: 892px;
    left: 457px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #personalDataCompetitorPBImg {
    position: fixed;
    height: 36px;
    width: 45px;
    top: 927px;
    left: 412px;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }
</style>
