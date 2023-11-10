<script>
  import { currentSite } from "../lib/store";
  import AiApp from "./ai/AiApp.svelte";
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
        class="pt-[11rem] h-[24rem] justify-center border-t border-base-300"
      >
        Choose a tab to see a project
      </div>{/if}
    {#if $currentSite === "portfolio"}portfolio{/if}
    {#if $currentSite === "ai"}<AiApp />{/if}
    {#if $currentSite === "chess"}chess{/if}
    {#if $currentSite === "crud"}crud{/if}
  </div>
</div>
