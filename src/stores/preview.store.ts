import { readable, writable } from "svelte/store";

const channel = new BroadcastChannel("graphics");
export const previewChannel = readable(channel);

const clear = new BroadcastChannel("clear");
export const clearChannel = readable(clear);

export const visibleGraphics = writable({ id: "", data: {}, type: undefined });
