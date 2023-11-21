<script>
  import Site from "./components/site.svelte";
  import { currentTheme } from "./lib/state";
</script>

<html lang="en" data-theme={$currentTheme}>
  <div class="min-h-screen flex flex-col">
    <Site />
  </div>
</html>
