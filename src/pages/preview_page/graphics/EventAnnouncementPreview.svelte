<script lant="ts">
  import { visiblePreview } from "../../../stores/preview.store";
</script>

<div id="event--wrapper">
  <img
    id="eventBackground"
    alt="eventAnnouncement"
    src="/img/graphics/eventAnnouncement.png"
  />
  <p id="eventTitle">{$visiblePreview.data["Event Name"]}</p>
  <p id="eventLocation">{$visiblePreview.data["Location"]}</p>
  <p id="eventHashtag">{$visiblePreview.data["Hashtag"]}</p>
</div>

<style>
  #event--wrapper {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  #eventBackground {
    top: 274px;
    left: 517px;
    position: fixed;
    transform-origin: top center;
  }

  #eventTitle {
    font-family: "Montserrat-Bold";
    font-size: 24pt;
    position: fixed;
    top: 295px;
    left: 730px;
    color: rgb(28, 59, 113);
    transform-origin: top center;
  }

  #eventLocation {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    top: 362px;
    left: 775px;
    color: white;
    transform-origin: top center;
  }

  #eventHashtag {
    font-family: "Montserrat-MediumItalic";
    font-size: 16pt;
    position: fixed;
    top: 678px;
    left: 890px;
    color: white;
    transform-origin: top center;
  }
</style>
