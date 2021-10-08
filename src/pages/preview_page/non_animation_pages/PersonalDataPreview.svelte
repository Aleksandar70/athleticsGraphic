<script lant="ts">
  import { visiblePreview } from "../../../stores/preview.store";
</script>

<div id="personalData--wrapper">
  <img
    id="personalDataCompetitorImg"
    alt="personalDataCompetitorImg"
    src="/img/graphics/personalDataCompetitor.png"
  />
  <p id="personalDataCompetitorID">{$visiblePreview.data["ID"]}</p>
  <img
    id="personalDataCompetitorFlag"
    alt={$visiblePreview.data["Flag"]}
    src="/img/flags/{$visiblePreview.data['Flag']}.png"
  />
  <p id="personalDataCompetitorCountry">
    {$visiblePreview.data["Nationality"]}
  </p>
  <p id="personalDataCompetitorName">
    {`${$visiblePreview.data["First Name"]} ${$visiblePreview.data["Last Name"]}`}
  </p>
  <img
    id="personalDataCompetitorPBImg"
    alt="personalDataCompetitorPBImg"
    src="/img/graphics/pb.png"
  />
  <p id="personalDataCompetitorPB">{$visiblePreview.data["Personal Best"]}</p>
  <img
    id="personalDataCompetitorSBImg"
    alt="personalDataCompetitorSBImg"
    src="/img/graphics/sb.png"
  />
  <p id="personalDataCompetitorSB">{$visiblePreview.data["Season Best"]}</p>
  <p id="personalDataCompetitorAge">Age: {$visiblePreview.data["Age"]}</p>
</div>

<style>
  #personalData--wrapper {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }
  #personalDataCompetitorImg {
    bottom: 100px;
    left: 30px;
    position: fixed;
    transform-origin: left center;
  }
  #personalDataCompetitorID {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: center;
    width: 75px;
    height: 48px;
    line-height: 48px;
    bottom: 250px;
    left: 230px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
  }

  #personalDataCompetitorFlag {
    position: fixed;
    height: 48px;
    width: 48px;
    bottom: 265px;
    left: 325px;
    transform-origin: left center;
  }
  #personalDataCompetitorCountry {
    font-family: "Montserrat-SemiBold";
    font-size: 20pt;
    position: fixed;
    text-align: left;
    width: 56px;
    height: 56px;
    line-height: 56px;
    bottom: 245px;
    left: 375px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
  }
  #personalDataCompetitorName {
    font-family: "Montserrat-SemiBold";
    font-size: 24pt;
    position: fixed;
    text-align: left;
    width: 800px;
    height: 48px;
    line-height: 48px;
    bottom: 250px;
    left: 450px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
  }

  #personalDataCompetitorAge {
    font-family: "Montserrat-SemiBold";
    font-size: 21pt;
    position: fixed;
    text-align: center;
    width: 400px;
    height: 48px;
    line-height: 48px;
    bottom: 195px;
    left: 700px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
  }

  #personalDataCompetitorPB {
    font-family: "Montserrat-SemiBold";
    font-size: 16pt;
    position: fixed;
    text-align: center;
    width: 75px;
    height: 48px;
    line-height: 48px;
    bottom: 195px;
    left: 487px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
  }

  #personalDataCompetitorPBImg {
    position: fixed;
    height: 36px;
    width: 45px;
    bottom: 215px;
    left: 440px;
    transform-origin: left center;
  }

  #personalDataCompetitorSB {
    font-family: "Montserrat-SemiBold";
    font-size: 16pt;
    position: fixed;
    text-align: center;
    width: 75px;
    height: 48px;
    line-height: 48px;
    bottom: 195px;
    left: 700px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
  }

  #personalDataCompetitorSBImg {
    position: fixed;
    height: 36px;
    width: 45px;
    bottom: 215px;
    left: 650px;
    transform-origin: left center;
  }
</style>
