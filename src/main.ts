import App from "./App.svelte";
import "./i18n";

const app = new App({
  target: document.body,
});

export default app;

// \b.*[a-zA-Z]{2,}.*\b
