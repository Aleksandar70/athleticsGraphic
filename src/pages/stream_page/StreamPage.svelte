<script>
  import "./streampage.style.css";
  import gsap from "gsap";
  import { onMount } from "svelte";

  onMount(() => {
    const timeline = gsap.timeline();

    timeline
      .to("#najavaDogadjajaBG", 0.5, {
        duration: 0.5,
        opacity: 1,
        scaleY: 1,
        ease: "power2.out",
      })
      .to(
        "#najavaDogadjajaNaslov",
        0.5,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#najavaDogadjajaLokacija",
        0.3,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
      )
      .to(
        "#najavaDogadjajaHash",
        0.1,
        { opacity: 1, scaleY: 1, ease: "power2.out" },
        "<.2"
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
