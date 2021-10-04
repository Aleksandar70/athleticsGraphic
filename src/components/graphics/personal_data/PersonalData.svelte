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
      .to("#personalDataCompetitor", {
        duration: 0.5,
        opacity: 1,
        scaleY: 1,
        ease: "power2.out",
      })
      .to(
        "#personalDataID",
        { duration: 0.5, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#personalDataFlag",
        { duration: 0.3, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
      )
      .to(
        "#personalDataNationality",
        { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.1"
      )
      .to(
        "#personalDataFirstName",
        { duration: 0.5, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#personalDataLastName",
        { duration: 0.3, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
      )
      .to(
        "#personalDataAge",
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
    id="personalDataCompetitor"
    alt="personalDataCompetitor"
    src="/img/graphics/personalDataCompetitor.png"
  />
  <p id="personalDataID">{data["ID"]}</p>
  <p id="personalDataFlag">{data["Flag"]}</p>
  <p id="personalDataNationality">{data["Nationality"]}</p>
  <p id="personalDataFirstName">{data["First Name"]}</p>
  <p id="personalDataLastName">{data["Last Name"]}</p>
  <p id="personalDataAge">{data["Age"]}</p>
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
  #personalDataCompetitor {
    top: 274px;
    left: 517px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #personalDataID {
    font-family: "Montserrat-Bold";
    font-size: 24pt;
    position: fixed;
    top: 295px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #personalDataFlag {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    top: 362px;
    left: 775px;
    color: white;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #personalDataNationality {
    font-family: "Montserrat-MediumItalic";
    font-size: 16pt;
    position: fixed;
    top: 678px;
    left: 890px;
    color: white;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }
</style>
