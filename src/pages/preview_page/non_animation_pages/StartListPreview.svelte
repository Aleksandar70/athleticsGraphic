<script lant="ts">
  import { Constants } from "../../../../global/constants/constants";

  export let data;

  $: numberOfCompetitors = data["Competitors"].length;
  $: iterationNumber = Math.ceil(
    numberOfCompetitors / Constants.ROWS_PER_TABLE
  );

  let minIndex = 0;
  $: maxIndex = Math.ceil(numberOfCompetitors / iterationNumber);

  $: competitorsRange = data["Competitors"].slice(minIndex, maxIndex);
</script>

<div id="startList" class="startList">
  <img
    id="startListHeader"
    src="/img/graphics/listHeader.png"
    alt="listHeader"
  />
  <p id="startListCompetitonTitle">{data["Competition"]}</p>
  <p id="startListDiscipline">{data["Event Name"]}</p>
  <p id="startListHash">{data["Hashtag"]}</p>
  <p id="startListDescription">{data["Description"]}</p>

  {#each competitorsRange as competitor, i}
    <img
      style="top: {347 + 59 * i}px"
      class="competitor-info"
      id="competitor-info-{i}"
      src="/img/graphics/listCompetitor.png"
      alt="listCompetitor"
    />
    <p
      style="top: {347 + 59 * i}px"
      class="startListPosition"
      id="startListPosition-{i}"
    >
      {i + minIndex + 1}
    </p>
    <img
      style="top: {347 + 59 * i}px"
      class="startListFlag"
      id="startListFlag-{i}"
      src="/img/flags/{competitor.nationality}.png"
      alt={competitor.nationality}
    />
    <p
      style="top: {347 + 59 * i}px"
      class="startListCountry"
      id="startListCountry-{i}"
    >
      {competitor.nationality}
    </p>
    <p
      style="top: {347 + 59 * i}px"
      class="startListName"
      id="startListName-{i}"
    >
      {competitor.name}
    </p>
  {/each}
</div>

<style>
  /* START LIST */
  #startList {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #startListHeader {
    top: 212px;
    left: 485px;
    position: fixed;
    transform-origin: top center;
  }

  #startListDescription {
    font-family: "Montserrat-Semibold";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 350px;
    height: 38px;
    line-height: 38px;
    top: 313px;
    left: 980px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
  }

  #startListCompetitonTitle {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 900px;
    height: 56px;
    line-height: 56px;
    top: 193px;
    left: 485px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
  }

  #startListDiscipline {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: center;
    width: 375px;
    height: 46px;
    line-height: 46px;
    top: 285px;
    left: 658px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
  }

  #startListHash {
    font-family: "Montserrat-MediumItalic";
    font-size: 15pt;
    position: fixed;
    text-align: center;
    width: 300px;
    height: 38px;
    line-height: 38px;
    top: 279px;
    left: 1000px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
  }

  .competitor-info {
    left: 485px;
    position: fixed;
    transform-origin: top center;
  }

  .startListPosition {
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

  .startListFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    left: 590px;
    transform-origin: top center;
  }

  .startListCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    left: 648px;
    color: rgb(255, 255, 255);
    transform-origin: top center;
  }
  .startListName {
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
</style>
