<script lang="ts">
  import { currentTheme } from "../lib/store";
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
  ];
  let options: any;

  function setTheme(theme: string) {
    currentTheme.set(theme);
  }
</script>

<div class="dropdown dropdown-hover dropdown-end">
  <label tabindex="0" class="btn m-1">Themes</label>
  <ul
    tabindex="0"
    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
  >
    {#each themes as theme (theme)}
      <li>
        <button on:click={() => setTheme(theme)}>{theme}</button>
      </li>
    {/each}
  </ul>
</div>
