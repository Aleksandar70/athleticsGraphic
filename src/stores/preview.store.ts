import { readable, writable } from "svelte/store";

const channel = new BroadcastChannel("preview");
export const previewChannel = readable(channel);

export const visiblePreview = writable({
  id: "",
  data: {},
  type: undefined,
  modalOpened: false,
});
