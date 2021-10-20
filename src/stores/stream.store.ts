import gsap from "gsap";
import { writable } from "svelte/store";

export const emptyGraphics = {
  id: "",
  data: {},
  type: undefined,
  modalOpen: false,
  heat: "",
};
export const visibleGraphics = writable(emptyGraphics);

export const timeline = writable(gsap.timeline());
export const headerTimeline = writable(gsap.timeline());

export const selectedSignature = writable({});
