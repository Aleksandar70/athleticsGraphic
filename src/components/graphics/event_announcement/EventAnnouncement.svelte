<script lant="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  onMount(() => {
    const timeline = gsap.timeline();

    timeline
      .to("#najavaDogadjajaBG", {
        duration: 0.5,
        opacity: 1,
        scaleY: 1,
        ease: "power2.out",
      })
      .to(
        "#najavaDogadjajaNaslov",
        { duration: 0.5, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#najavaDogadjajaLokacija",
        { duration: 0.3, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
      )
      .to(
        "#najavaDogadjajaHash",
        { duration: 0.1, opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.1"
      );
  });
</script>

<div class="graphics--wrapper">
  <div id="najavaDogadjaja" class="najavaDogadjaja">
    <img id="najavaDogadjajaBG" alt="img" src="/img/graphics/najava.png" />
    <p id="najavaDogadjajaNaslov">6th SERBIAN OPEN INDOOR MEETING</p>
    <p id="najavaDogadjajaLokacija">BELGRADE, FEBRUARY 2021</p>
    <p id="najavaDogadjajaHash">#belgrade2021</p>
  </div>
</div>

<style>
  #najavaDogadjajaBG {
    top: 274px;
    left: 517px;
    position: fixed;
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0);
  }

  #najavaDogadjajaNaslov {
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

  #najavaDogadjajaLokacija {
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

  #najavaDogadjajaHash {
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
