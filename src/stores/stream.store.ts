import gsap from "gsap";
import { writable } from "svelte/store";

export const visibleGraphics = writable({
  id: "",
  data: {},
  type: undefined,
  heat: "",
});

export const timeline = writable(gsap.timeline());

export const selectedSignature = writable({});
