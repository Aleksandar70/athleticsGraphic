<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { visibleGraphics } from "../../../stores/stream.store";
  import socket from "../../../utils/socket.util";

  export let data;

  let clear = false;

  socket.on("clear", () => (clear = true));

  const timeline = gsap.timeline();

  onMount(() => {
    timeline
      .to("#eventBackground", {
        duration: 0.5,
        opacity: 1,
        scaleY: 1,
        ease: "power2.out",
      })
      .to(
        "#eventTitle",
        { duration: 0.5, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#eventLocation",
        { duration: 0.3, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
      )
      .to(
        "#eventHashtag",
        { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.1"
      );
  });

  $: if (clear) {
    timeline.reverse().then(() => {
      clear = false;
      visibleGraphics.set({ id: "", data: {} });
    });
  }
</script>

<div id="event--wrapper">
  <img
    id="eventBackground"
    alt="eventAnnouncement"
    src="/img/graphics/eventAnnouncement.png"
  />
  <p id="eventTitle">{data["Event Name"]}</p>
  <p id="eventLocation">{data["Location"]}</p>
  <p id="eventHashtag">{data["Hashtag"]}</p>
</div>

<style>
  #event--wrapper {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  #eventBackground {
    top: 274px;
    left: 517px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #eventTitle {
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

  #eventLocation {
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

  #eventHashtag {
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
