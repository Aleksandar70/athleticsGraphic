<script lant="ts">
  import { visiblePreview } from "../../../stores/preview.store";
</script>

<div id="discipline--wrapper">
  <img
    id="disciplineAnnouncement"
    alt="disciplineAnnouncement"
    src="/img/graphics/disciplineAnnouncement.png"
  />
  <p id="disciplineTitle">
    {#if $visiblePreview.data["Heat"]}
      {$visiblePreview.data["Heat"]}
    {/if}
    {$visiblePreview.data["Discipline Name"]}
  </p>
  <p id="disciplineNextNote">{$visiblePreview.data["Note"]}</p>
  <p id="disciplineTime">{$visiblePreview.data["Time"]}</p>
</div>

<style>
  /* DISCIPLINE ANNOUNCEMENT */
  #discipline--wrapper {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  #disciplineAnnouncement {
    top: 857px;
    left: 189px;
    position: fixed;
    transform-origin: left center;
  }
  #disciplineTitle {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: center;
    width: 310px;
    height: 48px;
    line-height: 48px;
    top: 855px;
    left: 403px;
    color: rgb(255, 255, 255);
    z-index: 1;
    transform-origin: left center;
  }
  #disciplineTime {
    font-family: "Montserrat-MediumItalic";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 500px;
    height: 48px;
    line-height: 48px;
    top: 915px;
    left: 250px;
    color: rgb(255, 255, 255);
    z-index: 1;
    transform-origin: center left;
  }
  /* NEXT DISCIPLINE */
  #disciplineNextNote {
    font-family: "Montserrat-MediumItalic";
    font-size: 22pt;
    position: fixed;
    text-align: left;
    width: 500px;
    height: 48px;
    line-height: 48px;
    top: 915px;
    left: 400px;
    color: rgb(255, 255, 255);
    z-index: 1;
    transform-origin: left center;
  }
</style>
