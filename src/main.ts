import "./app.postcss";
import App from "./App.svelte";

const app = new App({
  //@ts-ignore
  target: document.getElementById("app"),
});

export default app;
