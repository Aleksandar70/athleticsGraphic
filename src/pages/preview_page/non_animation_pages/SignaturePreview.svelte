<script lant="ts">
  import { visiblePreview } from "../../../stores/preview.store";
</script>

<div id="signature--wrapper">
  <img id="signature" alt="signature" src="/img/graphics/signature.png" />
  <p id="signatureName">{$visiblePreview.data["Name"]}</p>
  <p id="signatureTitle">{$visiblePreview.data["Title"]}</p>
</div>

<style>
  #signature--wrapper {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
  }
  #signature {
    top: 868px;
    left: 585px;
    position: fixed;
    transform-origin: left center;
  }

  #signatureName {
    font-family: "Montserrat-SemiBold";
    font-size: 25pt;
    position: fixed;
    text-align: center;
    width: 1000px;
    height: 48px;
    line-height: 48px;
    top: 870px;
    left: 501px;
    color: rgb(28, 59, 113);
    transform-origin: left center;
  }

  #signatureTitle {
    font-family: "Montserrat-SemiBold";
    font-size: 21pt;
    position: fixed;
    text-align: center;
    width: 1000px;
    height: 48px;
    line-height: 48px;
    top: 920px;
    left: 503px;
    color: rgb(255, 255, 255);
    transform-origin: left center;
  }
</style>
