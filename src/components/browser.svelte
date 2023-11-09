<script>
  import { currentSite } from "../lib/store";
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
  <div class="flex justify-center px-4 py-16 border-t border-base-300">
    {#if $currentSite === "intro"}Choose a tab to see a project{/if}
    {#if $currentSite === "portfolio"}portfolio{/if}
    {#if $currentSite === "ai"}ai{/if}
    {#if $currentSite === "chess"}chess{/if}
    {#if $currentSite === "crud"}crud{/if}
  </div>
</div>
