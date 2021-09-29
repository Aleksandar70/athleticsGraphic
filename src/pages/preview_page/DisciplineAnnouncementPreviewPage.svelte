<script lant="ts">
  export let data;
</script>

<div id="discipline--wrapper">
  <img
    id="disciplineAnnouncement"
    alt="disciplineAnnouncement"
    src="/img/graphics/disciplineAnnouncement.png"
  />
  <p id="disciplineTitle">{data["Discipline Name"]}</p>
  <p id="disciplineNextNote">{data["Note"]}</p>
  <p id="disciplineTime">{data["Time"]}</p>
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
    opacity: 0;
    transform: scaleX(0);
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
    opacity: 0;
    transform: scaleX(0);
  }
  /* #disciplinetNote {
        font-family: "Montserrat-MediumItalic";
        font-size: 22pt;
        position: fixed;
        text-align: center;
        width: 500px;
        height: 48px;
        line-height: 48px;
        top: 890px;
        left: 330px;
        color: rgb(255, 255, 255);
        z-index: 1;
        transform-origin: left center;
        opacity: 0;
        transform: scaleX(0);
      } */
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
    opacity: 0;
    transform: scaleX(0);
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
    opacity: 0;
    transform: scaleX(0);
  }
</style>
