<script lang="ts">
  import ThemeSwitcher from "./themeSwitcher.svelte";
  import { currentSite } from "../../lib/store";

  function toggleSite(site: string) {
    currentSite.set(site);
  }
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost lg:hidden" />
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a>Item 1</a></li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <div class="avatar">
      <div class="w-24 mask mask-squircle">
        <img
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
        class="btn-secondary join-item place-content-center w-28">Home</button
      >

      <button
        on:click={() => {
          toggleSite("ai");
        }}
        class="btn-secondary join-item place-content-center w-28">AI</button
      >

      <button
        on:click={() => {
          toggleSite("chess");
        }}
        class="btn-secondary join-item place-content-center w-28">Chess</button
      >

      <button
        on:click={() => {
          toggleSite("crud");
        }}
        class="btn-secondary join-item place-content-center w-28">CRUD</button
      >
    </div>
  </div>
  <div class="navbar-end"><ThemeSwitcher /></div>
</div>
