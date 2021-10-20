import { get, readable, writable } from "svelte/store";
import { emptyGraphics } from "./stream.store";

const channel = new BroadcastChannel("preview");

export const visiblePreview = writable(emptyGraphics);

export const previewChannel = readable(channel);
get(previewChannel).addEventListener("message", (event) => {
  const dataToSet = event.data.modalOpened ? event.data : emptyGraphics;
  visiblePreview.set(dataToSet);
});
