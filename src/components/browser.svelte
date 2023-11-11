<script>
  import { fade } from "svelte/transition";
  import { currentSite } from "../lib/store";
  import AiApp from "./ai/AiApp.svelte";
  import Hero from "./hero/hero.svelte";
  import Crud from "./crud/crud.svelte";
</script>

<div class="mockup-browser border border-base-300">
  <div class="mockup-browser-toolbar">
    <div class="input border border-base-300">
      {#if $currentSite === "intro"}https://intro.com{/if}
      {#if $currentSite === "portfolio"}https://portfolio.com{/if}
      {#if $currentSite === "ai"}https://ai-tools.com{/if}
      {#if $currentSite === "chess"}https://chess.com{/if}
      {#if $currentSite === "crud"}https://crud-post.com{/if}
    </div>
  </div>
  <div>
    {#if $currentSite === "intro"}<div
        out:fade={{ duration: 1000 }}
        class="pt-[11rem] h-[24rem] justify-center border-t border-base-300"
      >
        Choose a tab to see a project
      </div>{/if}
    {#if $currentSite === "portfolio"}
      <div
        in:fade={{ delay: 1500, duration: 1000 }}
        out:fade={{ duration: 1000 }}
      >
        <Hero />
      </div>
    {/if}
    {#if $currentSite === "ai"}<div
        in:fade={{ delay: 1500, duration: 1000 }}
        out:fade={{ duration: 1000 }}
      >
        <AiApp />
      </div>{/if}
    {#if $currentSite === "chess"}<div
        in:fade={{ delay: 1500, duration: 1000 }}
        out:fade={{ duration: 1000 }}
      >
        chess
      </div>{/if}
    {#if $currentSite === "crud"}<div
        in:fade={{ delay: 1500, duration: 1000 }}
        out:fade={{ duration: 1000 }}
      >
        <Crud />
      </div>{/if}
  </div>
</div>
