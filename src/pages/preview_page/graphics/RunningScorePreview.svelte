<script lang="ts">
  import { visiblePreview } from "../../../stores/preview.store";
</script>

<img
  id="scoresBackground"
  alt="score_rounds"
  src="/img/graphics/score_running.png"
/>
<p id="scoresEventName">
  {#if $visiblePreview.data["Heat"]}
    {$visiblePreview.data["Heat"]}
  {/if}
  {$visiblePreview.data["Event Name"]}
</p>
<p id="scoresBib">{$visiblePreview.data["ID"]}</p>
<img
  id="scoresFlag"
  alt={$visiblePreview.data["Flag"]}
  src="/img/flags/{$visiblePreview.data['Flag']}.png"
/>
<p id="scoresCountry">{$visiblePreview.data["Nationality"]}</p>
<p id="scoresCompetitor">
  {`${$visiblePreview.data["First Name"]} ${$visiblePreview.data["Last Name"]}`}
</p>
<p id="score">{$visiblePreview.data["Result"]}</p>

<style>
  #scoresBackground {
    top: 802px;
    left: 187px;
    position: fixed;
    transform-origin: left center;
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
  }

  #scoresFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    top: 867px;
    left: 292px;
    transform-origin: left center;
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
  }
</style>
