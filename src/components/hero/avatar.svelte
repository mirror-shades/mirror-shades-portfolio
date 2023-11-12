<script>
  import { draw } from "svelte/transition";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div class="avatar">
  <div
    class="w-52 ring-8 ring-primary ring-offset-base-100 ring-offset-2 rounded-full"
  >
    <div
      transition:scale={{
        duration: 500,
        delay: 1000,
        opacity: 0.5,
        start: 0.5,
        easing: quintOut,
      }}
    />
    <img
      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
    />
  </div>
</div>
