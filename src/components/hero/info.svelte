<script lang="ts">
  import { quintOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import Typewriter from "./typewriter.svelte";
</script>

<div
  in:fly={{
    delay: 250,
    duration: 300,
    x: 300,
    y: 200,
    opacity: 0.5,
    easing: quintOut,
  }}
  out:fade={{
    delay: 0,
    duration: 300,
    easing: quintOut,
  }}
>
  <h1 class="text-primary">My name is</h1>
</div>
<div
  in:fly={{
    delay: 750,
    duration: 300,
    x: -800,
    y: -400,
    opacity: 0.5,
    easing: quintOut,
  }}
  out:fade={{
    delay: 0,
    duration: 300,
    easing: quintOut,
  }}
>
  <h1 class="text-secondary">Logan</h1>
</div>
<div
  in:fly={{
    delay: 1500,
    duration: 300,
    x: 1200,
    y: 1200,
    opacity: 0.5,
    easing: quintOut,
  }}
  out:fade={{
    delay: 0,
    duration: 300,
    easing: quintOut,
  }}
>
  <h1 class="text-primary">and I specialize in:</h1>
</div>
<div
  in:fade={{
    delay: 2200,
    duration: 1000,
    easing: quintOut,
  }}
  out:fade={{
    delay: 0,
    duration: 500, // Faster fade out
    easing: quintOut,
  }}
>
  <Typewriter />
</div>
