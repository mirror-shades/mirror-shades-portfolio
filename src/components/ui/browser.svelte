<script>
  import { fade } from "svelte/transition";
  import { currentSite } from "../../lib/store";
  import AiApp from "../ai/AiApp.svelte";
  import Hero from "../hero/hero.svelte";
  import Crud from "../crud/crud.svelte";
  import BalloonPop from "../misc/balloonPop.svelte";
  let height = "h-[28rem]";
</script>

<div class="mockup-browser {height} border-primary border border-base-300">
  <div class="mockup-browser-toolbar">
    <div class="input border border-base-300">
      {#if $currentSite === "intro"}https://intro.com{/if}
      {#if $currentSite === "portfolio"}https://portfolio.com{/if}
      {#if $currentSite === "ai"}https://ai-tools.com{/if}
      {#if $currentSite === "chess"}https://chess.com{/if}
      {#if $currentSite === "crud"}https://crud-post.com{/if}
    </div>
  </div>
  {#if $currentSite === "intro"}<div
      out:fade={{ duration: 1000 }}
      class="absolute inset-0 pt-[11rem] justify-center border-t border-base-300"
    >
      <BalloonPop />
    </div>{/if}
  {#if $currentSite === "portfolio"}
    <div
      class="absolute inset-0 ml-12 mt-24"
      in:fade={{ delay: 800, duration: 1000 }}
      out:fade={{ duration: 1000 }}
    >
      <Hero />
    </div>
  {/if}
  {#if $currentSite === "ai"}<div
      class="absolute inset-0 mt-12 h-screen"
      in:fade={{ delay: 800, duration: 1000 }}
      out:fade={{ duration: 1000 }}
    >
      <AiApp />
    </div>{/if}
  {#if $currentSite === "chess"}<div
      class="absolute inset-0 mt-12"
      in:fade={{ delay: 800, duration: 1000 }}
      out:fade={{ duration: 1000 }}
    >
      chess
    </div>{/if}
  {#if $currentSite === "crud"}<div
      class="absolute inset-0 mt-12"
      in:fade={{ delay: 800, duration: 1000 }}
      out:fade={{ duration: 1000 }}
    >
      <Crud />
    </div>{/if}
</div>
