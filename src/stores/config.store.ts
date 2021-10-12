import { writable } from "svelte/store";

export const dataSource = writable("");
export const language = writable("");
export const allLanguages = writable([]);
export const selectedSignature = writable("");
