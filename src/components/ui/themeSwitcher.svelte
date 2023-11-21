<script lang="ts">
  import { currentTheme } from "../../lib/state";
  const themes = [
    "light",
    "dark",
    "cupcake",
    "halloween",
    "emerald",
    "synthwave",
    "retro",
    "cyberpunk",
    "garden",
    "valentine",
    "forest",
    "aqua",
    "business",
    "lemonade",
    "coffee",
    "lofi",
  ];
  let options: any;

  function setTheme(theme: string) {
    if (theme === "light") {
      theme = "winter";
    }
    currentTheme.set(theme);
  }
</script>

<div class="dropdown dropdown-hover dropdown-end">
  <button tabindex="0" class="btn-ghost border-primary w-32 btn m-1"
    >Themes</button
  >
  <ul
    class="dropdown-content bg-base ring-1 ring-primary z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
  >
    {#each themes as theme (theme)}
      <li>
        <button on:click={() => setTheme(theme)}>{theme}</button>
      </li>
    {/each}
  </ul>
</div>
