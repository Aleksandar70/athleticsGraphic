import { readable, writable } from "svelte/store";

const channel = new BroadcastChannel("preview");
export const previewChannel = readable(channel);

const clear = new BroadcastChannel("clear");
export const clearChannel = readable(clear);

export const visiblePreview = writable({ id: "", data: {}, type: undefined });
