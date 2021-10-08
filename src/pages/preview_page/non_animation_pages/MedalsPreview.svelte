<script lant="ts">
  import { visiblePreview } from "../../../stores/preview.store";

  $: bestCompetitors = $visiblePreview.data["Medals"];
</script>

<div id="medals" class="medals">
  <img id="medalsBG" src="/img/graphics/medals.png" alt="medals" />

  <p id="medalsCompetition">{$visiblePreview.data["Competition"]}</p>
  <p id="medalsEvent">{$visiblePreview.data["Event Name"]}</p>
  <p id="medalsHash">{$visiblePreview.data["Hashtag"]}</p>
  <p id="medalsTitle">{$visiblePreview.data["Description"]}</p>

  {#each bestCompetitors as bestCompetitor, i}
    <p style="top: {805 + 59 * i}px" class="medalsPlace" id="medalsPlace-{i}">
      {i + 1}
    </p>
    <img
      style="top: {805 + 59 * i}px"
      class="medalsFlag"
      id="medalsFlag-{i}"
      src="/img/flags/{bestCompetitor.nationality}.png"
      alt={bestCompetitor.nationality}
    />
    <p
      style="top: {805 + 58 * i}px"
      class="medalsCountry"
      id="medalsCountry-{i}"
    >
      {bestCompetitor.nationality}
    </p>
    <p
      style="top: {805 + 58 * i}px"
      class="medalsCompetitor"
      id="medalsCompetitor-{i}"
    >
      {bestCompetitor.name}
    </p>
    <p
      style="top: {805 + 58 * i}px"
      class="medalsPerformance"
      id="medalsPerformance-{i}"
    >
      {bestCompetitor.result}
    </p>
    <p style="top: {805 + 58 * i}px" class="medalsMedal" id="medalsMedal-{i}">
      {#if i == 0}
        <img
          id="medalsMedal-{i}"
          src="/img/graphics/goldMedal.png"
          alt="goldMedal"
        />
      {:else if i == 1}
        <img
          id="medalsMedal-{i}"
          src="/img/graphics/silverMedal.png"
          alt="silverMedal"
        />
      {:else}
        <img
          id="medalsMedal-{i}"
          src="/img/graphics/bronzeMedal.png"
          alt="bronzeMedal"
        />
      {/if}
    </p>
  {/each}
</div>

<style>
  #medals {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  #medalsBG {
    top: 666px;
    left: 484px;
    position: fixed;
    transform-origin: top center;
  }
  #medalsCompetition {
    font-family: "Montserrat-Bold";
    font-size: 24pt;
    position: fixed;
    top: 680px;
    left: 615px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
  }
  #medalsHash {
    font-family: "Montserrat-MediumItalic";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 300px;
    height: 38px;
    line-height: 38px;
    top: 735px;
    left: 980px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
  }
  #medalsTitle {
    font-family: "Montserrat-Semibold";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 350px;
    height: 38px;
    line-height: 38px;
    top: 770px;
    left: 940px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
  }

  #medalsEvent {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: center;
    width: 310px;
    height: 48px;
    line-height: 48px;
    top: 740px;
    left: 695px;
    color: rgb(255, 255, 255);
    z-index: 1;
    transform-origin: top center;
  }

  .medalsMedal {
    position: fixed;
    width: 35px;
    height: 46px;
    top: 807px;
    left: 1370px;
    transform-origin: top center;
  }

  .medalsPlace {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 100px;
    height: 56px;
    line-height: 56px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
  }

  .medalsFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    left: 590px;
    transform-origin: top center;
  }

  .medalsCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    left: 645px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
  }

  .medalsCompetitor {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
  }

  .medalsPerformance {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 100px;
    height: 48px;
    line-height: 48px;
    left: 1250px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
  }
</style>
