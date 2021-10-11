<script lang="ts">
  import io from "socket.io-client";
  import { visibleGraphics } from "../../../stores/stream.store";
  import clearSocket from "../../../utils/socket.util";

  const socket = io("http://localhost:4000");

  let time = "";

  var parser = new DOMParser();
  $: doc = parser.parseFromString(time, "text/xml");

  socket.on("time", (data) => (time = data));

  let clear = false;
  clearSocket.on("clear", () => (clear = true));

  $: if (clear) {
    clear = false;
    visibleGraphics.set({ id: "", data: {}, type: undefined, heat: "" });
  }
</script>

<div id="runTime" class="runTime">
  <img id="runTimeBG" alt="time" src="/img/graphics/time.png" />
  <p id="runTimeText">{doc.getElementsByTagName("time")?.[0]?.innerHTML}</p>
</div>

<style>
  #runTime {
    width: 1920px;
    height: 1080px;
    z-index: 0;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #runTimeBG {
    top: 903px;
    left: 1476px;
    position: fixed;
  }

  #runTimeText {
    font-family: "Montserrat-SemiBold";
    font-size: 22pt;
    position: fixed;
    text-align: right;
    width: 310px;
    height: 48px;
    line-height: 48px;
    top: 920px;
    left: 1371px;
    color: white;
    z-index: 1;
  }
</style>
