import { register, init, getLocaleFromNavigator } from "svelte-i18n";

register("en", () => import("../i18n/en.json"));
register("default", () => import("../i18n/default.json"));

init({
  fallbackLocale: "default",
  initialLocale: getLocaleFromNavigator(),
});
