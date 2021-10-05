import { register, init } from "svelte-i18n";

register("default", () => import("../i18n/default.json"));

init({
  fallbackLocale: "default",
  initialLocale: "default",
});
