import { writable } from "svelte/store";

export const visibleGraphics = writable({
  id: "",
  data: {},
  type: undefined,
  heat: "",
});
