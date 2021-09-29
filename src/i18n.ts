import { register, init, getLocaleFromNavigator } from "svelte-i18n";

register("default", () => import("../i18n/default.json"));
register("en", () => import("../i18n/en.json"));

init({
  fallbackLocale: "default",
  initialLocale: getLocaleFromNavigator(),
});
