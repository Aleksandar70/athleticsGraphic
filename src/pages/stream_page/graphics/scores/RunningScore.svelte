<script lang="ts">
  import { onMount } from "svelte";
  import { timeline, visibleGraphics } from "../../../../stores/stream.store";

  onMount(() => {
    $timeline
      .to("#scoresBackground", {
        duration: 1,
        opacity: 1,
        scaleX: 1,
        ease: "power2.out",
      })
      .to(
        "#scoresBib",
        { duration: 0.7, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#scoresFlag",
        { duration: 0.5, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.1"
      )
      .to(
        "#scoresEventName",
        { duration: 0.7, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#scoresCountry",
        { duration: 0.5, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.2"
      )
      .to(
        "#scoresCompetitor",
        { duration: 0.5, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<"
      )
      .to(
        "#score",
        { duration: 0.1, opacity: 1, scaleX: 1, ease: "power2.out" },
        "<0.15"
      );
  });
</script>

<img
  id="scoresBackground"
  alt="score_rounds"
  src="/img/graphics/score_running.png"
/>
<p id="scoresEventName">
  {#if $visibleGraphics.data["Heat"]}
    {$visibleGraphics.data["Heat"]}
  {/if}
  {$visibleGraphics.data["Event Name"]}
</p>
<p id="scoresBib">{$visibleGraphics.data["ID"]}</p>
<img
  id="scoresFlag"
  alt={$visibleGraphics.data["Flag"]}
  src="/img/flags/{$visibleGraphics.data['Flag']}.png"
/>
<p id="scoresCountry">{$visibleGraphics.data["Nationality"]}</p>
<p id="scoresCompetitor">
  {`${$visibleGraphics.data["First Name"]} ${$visibleGraphics.data["Last Name"]}`}
</p>
<p id="score">{$visibleGraphics.data["Result"]}</p>

<style>
  #scoresBackground {
    top: 802px;
    left: 187px;
    position: fixed;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresEventName {
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

  #scoresBib {
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

  #scoresFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 867px;
    left: 292px;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    top: 860px;
    left: 343px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }

  #scoresCompetitor {
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

  #score {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 912px;
    left: 769px;
    color: white;
    transform-origin: left center;
    opacity: 0;
    transform: scaleX(0);
  }
</style>
