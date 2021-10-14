import gsap from "gsap";
import { io } from "socket.io-client";
import { get } from "svelte/store";
import { Paths } from "../../global/constants/api";
import { timeline, visibleGraphics } from "../stores/stream.store";

const socket = io(`http://${Paths.IPV4}:${Paths.STREAMING_PORT}`);

socket.on("clear", () => {
  get(timeline)
    .reverse()
    .then(() => {
      visibleGraphics.set({ id: "", data: {}, type: undefined, heat: "" });
      timeline.set(gsap.timeline());
    });
});

export default socket;
