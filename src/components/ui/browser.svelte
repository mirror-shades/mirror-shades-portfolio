<script lang="ts">
  import { fade } from "svelte/transition";
  import { currentSite } from "../../lib/state";
  import AiApp from "../ai/AiApp.svelte";
  import Hero from "../hero/hero.svelte";
  import Game from "../game/blackjack.svelte";
  import AiNavbar from "../ai/aiNavbar.svelte";
  import Crypto from "../crypto/cryptoPage.svelte";
  import WalletConnect from "../crypto/walletConnect.svelte";

  let unique = {};
  $: () => {
    unique = {};
  };
  let duration = 250;
  let delay = 100;
</script>

<!--browser-->
<div class="mockup-browser h-[52rem] border-primary border border-base-300">
  <div class="mockup-browser-toolbar h-[3rem] pb-3 border-b">
    <div class="input border border-base-300">
      {#if $currentSite === "intro"}https://intro.com{/if}
      {#if $currentSite === "portfolio"}https://portfolio.com{/if}
      {#if $currentSite === "ai"}https://ai-tools.com{/if}
      {#if $currentSite === "chess"}https://chess.com{/if}
      {#if $currentSite === "crud"}https://crud-post.com{/if}
    </div>
    <div>
      <WalletConnect />
    </div>
  </div>
  <div class="relative overflow-auto h-full">
    {#if $currentSite === "portfolio"}
      <div
        class="absolute inset-0 ml-12 mt-24"
        in:fade={{ delay: delay, duration: duration }}
        out:fade={{ duration: duration }}
      >
        <Hero />
      </div>
    {/if}
    {#if $currentSite === "ai"}
      <AiNavbar />
      <div
        class="absolute inset-0 mt-24"
        in:fade={{ delay: delay, duration: duration }}
        out:fade={{ duration: duration }}
      >
        <AiApp />
      </div>{/if}
    {#if $currentSite === "blackjack"}<div
        class="absolute inset-0 mt-12"
        in:fade={{ delay: delay, duration: duration }}
        out:fade={{ duration: duration }}
      >
        <Game />
      </div>{/if}
    {#if $currentSite === "crypto"}<div
        class="absolute inset-0 mt-12"
        in:fade={{ delay: delay, duration: duration }}
        out:fade={{ duration: duration }}
      >
        <Crypto />
      </div>
    {/if}
  </div>
</div>
