import gsap from "gsap";
import { io } from "socket.io-client";
import { get } from "svelte/store";
import { Paths } from "../../global/constants/api";
import {
  emptyGraphics,
  headerTimeline,
  timeline,
  visibleGraphics,
} from "../stores/stream.store";

const socket = io(`http://${Paths.IPV4}:${Paths.STREAMING_PORT}`);

socket.on("clear", () =>
  get(timeline)
    .reverse()
    .then(() => {
      get(headerTimeline)
        .reverse()
        .then(() => headerTimeline.set(gsap.timeline()));
      visibleGraphics.set(emptyGraphics);
      timeline.set(gsap.timeline());
    })
);

export const reverseTimelines = (): void => {
  get(timeline)
    .reverse()
    .then(() => {
      get(headerTimeline)
        .reverse()
        .then(() => headerTimeline.set(gsap.timeline()));
      visibleGraphics.set(emptyGraphics);
      timeline.set(gsap.timeline());
    });
};

export default socket;
