import { writable } from "svelte/store";

export const dataSource = writable("");

export const shouldShowAllColumns = writable(false);

export const shouldShowDefaultColumns = writable(false);