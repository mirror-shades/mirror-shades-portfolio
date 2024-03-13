<script lang="ts">
  import ThemeSwitcher from "./themeSwitcher.svelte";
  import { currentSite } from "../../lib/state";

  function toggleSite(site: string) {
    currentSite.set(site);
  }
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="avatar">
      <div class="w-24 mask mask-squircle">
        <img
          alt="portrait"
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>
  </div>
  <div class="navbar-center hidden lg:flex">
    <div class="join h-10 join-vertical lg:join-horizontal">
      <button
        on:click={() => {
          toggleSite("portfolio");
        }}
        class="{$currentSite === 'portfolio'
          ? 'btn-accent'
          : 'btn-secondary'} join-item place-content-center w-28">Home</button
      >

      <button
        on:click={() => {
          toggleSite("ai");
        }}
        class="{$currentSite === 'ai'
          ? 'btn-accent'
          : 'btn-secondary'} join-item place-content-center w-28">AI</button
      >

      <button
        on:click={() => {
          toggleSite("blackjack");
        }}
        class="{$currentSite === 'blackjack'
          ? 'btn-accent'
          : 'btn-secondary'} join-item place-content-center w-28">Gaming</button
      >

      <button
        on:click={() => {
          toggleSite("crypto");
        }}
        class="{$currentSite === 'crypto'
          ? 'btn-accent'
          : 'btn-secondary'} join-item place-content-center w-28">Crypto</button
      >
    </div>
  </div>
  <div class="navbar-end"><ThemeSwitcher /></div>
</div>
