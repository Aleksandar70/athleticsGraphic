<script lang="ts">
  import { visiblePreview } from "../../../stores/preview.store";

  const scores =
    $visiblePreview.data["Scores"].filter(
      (score: string) => Object.values(score)[0]
    ).length > 6
      ? $visiblePreview.data["Scores"].slice(0).slice(-6)
      : $visiblePreview.data["Scores"];
</script>

<img
  id="scoresBackground"
  alt="score_rounds"
  src="/img/graphics/score_vertical.png"
/>
<p id="scoresEventName">{$visiblePreview.data["Event Name"]}</p>
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
{#each scores as score, i}
  <p class="metrics" id="scoresResult{i + 1}">
    {Object.keys(score)[0]}
  </p>
  <p class="scores" id="scoresResult{i + 1}">
    {Object.values(score)[0]}
  </p>
{/each}

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

  .metrics {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 902px;
    color: white;
    transform-origin: left center;
  }

  .scores {
    font-family: "Montserrat-SemiBold";
    font-size: 18pt;
    position: fixed;
    text-align: center;
    width: 68px;
    height: 48px;
    line-height: 48px;
    top: 927px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
  }

  #scoresResult1 {
    left: 409px;
  }

  #scoresResult2 {
    left: 529px;
  }

  #scoresResult3 {
    left: 649px;
  }

  #scoresResult4 {
    left: 769px;
  }

  #scoresResult5 {
    left: 889px;
  }

  #scoresResult6 {
    left: 1009px;
  }
</style>
