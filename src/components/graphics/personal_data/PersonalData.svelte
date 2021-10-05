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
      .to("#potpis1BDBG", {
        duration: 0.5,
        opacity: 1,
        scaleX: 1,
        ease: "power2.out",
      })
      .to(
        "#potpis1BDBib",
        { duration: 0.2, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#potpis1BDImg",
        { duration: 0.2, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#potpis1BDCountry",
        { duration: 0.2, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#potpis1BDTakmicar",
        { duration: 0.2, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#potpis1BDPBImg",
        { duration: 0.25, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#potpis1BDPB",
        { duration: 0.25, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#potpis1BDAge",
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

<div id="potpis1BD">
  <img
    id="potpis1BDBG"
    alt="personalDataCompetitorImg"
    src="/img/graphics/personalDataCompetitor.png"
  />
  <p id="potpis1BDBib">{data["ID"]}</p>
  <img
    id="potpis1BDImg"
    alt={data["Flag"]}
    src="/img/flags/{data['Flag']}.png"
  />
  <p id="potpis1BDCountry">{data["Nationality"]}</p>
  <p id="potpis1BDTakmicar">
    {`${data["First Name"]} ${data["Last Name"]}`}
  </p>
  <img
    id="potpis1BDPBImg"
    alt="personalDataCompetitorPBImg"
    src="/img/graphics/pb.png"
  />
  <p id="potpis1BDPB">{data["Personal Best"]}</p>
  <p id="potpis1BDAge">{data["Age"]}</p>
</div>

<style>
  #potpis1BD {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
  }

  #potpis1BDBG {
    top: 863px;
    left: 189px;
    position: fixed;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #potpis1BDBib {
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

  #potpis1BDImg {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 866px;
    left: 292px;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #potpis1BDCountry {
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

  #potpis1BDTakmicar {
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

  #potpis1BDAge {
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

  #potpis1BDPB {
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

  #potpis1BDPBImg {
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
