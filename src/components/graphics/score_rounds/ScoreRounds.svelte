<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  export let data = {};

  onMount(() => {
    const timeline = gsap.timeline();

    timeline
      .to("#horizontalSelektovaniRezultatBG", {
        duration: 1,
        opacity: 1,
        scaleX: 1,
        ease: "power2.out",
      })
      .to(
        "#horizontalSelektovaniRezultatBib",
        { duration: 0.7, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#horizontalSelektovaniRezultatImg",
        { duration: 0.5, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#horizontalSelektovaniRezultatDisciplina",
        { duration: 0.7, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#horizontalSelektovaniRezultatCountry",
        { duration: 0.5, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.2"
      )
      .to(
        "#horizontalSelektovaniRezultatTakmicar",
        { duration: 0.5, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#horizontalSelektovaniRezultatVrednost1",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.15"
      )
      .to(
        "#horizontalSelektovaniRezultatVrednost2",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#horizontalSelektovaniRezultatVrednost3",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#horizontalSelektovaniRezultatVrednost4",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#horizontalSelektovaniRezultatVrednost5",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.05"
      )
      .to(
        "#horizontalSelektovaniRezultatVrednost6",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.05"
      );
  });
</script>

<div id="horizontalSelektovaniRezultat" class="horizontalSelektovaniRezultat">
  <img
    id="horizontalSelektovaniRezultatBG"
    alt="score_rounds"
    src="/img/graphics/score_rounds.png"
  />
  <p id="horizontalSelektovaniRezultatDisciplina">{data["Event Name"]}</p>
  <p id="horizontalSelektovaniRezultatBib">{data["ID"]}</p>
  <img
    id="horizontalSelektovaniRezultatImg"
    alt={data["Flag"]}
    src="/img/flags/{data['Flag']}.png"
  />
  <p id="horizontalSelektovaniRezultatCountry">{data["Nationality"]}</p>
  <p id="horizontalSelektovaniRezultatTakmicar">
    {`${data["First Name"]} ${data["Last Name"]}`}
  </p>
  <p id="horizontalSelektovaniRezultatVrednost1" />
  <p id="horizontalSelektovaniRezultatVrednost2" />
  <p id="horizontalSelektovaniRezultatVrednost3" />
  <p id="horizontalSelektovaniRezultatVrednost4" />
  <p id="horizontalSelektovaniRezultatVrednost5" />
  <p id="horizontalSelektovaniRezultatVrednost6" />
</div>

<style>
  #horizontalSelektovaniRezultat {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #horizontalSelektovaniRezultatBG {
    top: 802px;
    left: 187px;
    position: fixed;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatDisciplina {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: center;
    width: 310px;
    height: 48px;
    line-height: 48px;
    top: 803px;
    left: 305px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatBib {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 75px;
    height: 48px;
    line-height: 48px;
    top: 865px;
    left: 205px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatImg {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 867px;
    left: 292px;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 865px;
    left: 343px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatTakmicar {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    top: 865px;
    left: 427px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatVrednost1 {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 897px;
    left: 409px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatVrednost2 {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 897px;
    left: 529px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatVrednost3 {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 897px;
    left: 649px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatVrednost4 {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 897px;
    left: 769px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatVrednost5 {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 897px;
    left: 889px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #horizontalSelektovaniRezultatVrednost6 {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 897px;
    left: 1009px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }
</style>
