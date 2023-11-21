<script lang="ts">
  import Name from "./name.svelte";
  import Typewriter from "svelte-typewriter";
  import { fly, fade } from "svelte/transition";
  import { backOut } from "svelte/easing";
  import { quintOut } from "svelte/easing";
  let text: any;
  $: text = "React development";
  let ticker = 1;
  let textSelection = [
    "React development",
    "Svelte development",
    "Smart Contracts",
    "Python development",
  ];
  let lines = [
    "My name is",
    "",
    "<h1 class='text-secondary'>Logan Dembicki</h1>",
    "",
    "and I specialize in:",
    "",
  ];

  const textLoop = async () => {
    if (ticker > 3) {
      ticker = 0;
    }
    text = textSelection[ticker];
    ticker += 1;
    setTimeout(textLoop, 3000);
  };
  textLoop();
</script>

<h1>
  <div class="lines">
    <div class="overflow">
      <div
        transition:fly={{
          delay: 250,
          duration: 300,
          x: 300,
          y: 200,
          opacity: 0.5,
          easing: quintOut,
        }}
      >
        My name is
      </div>
      <div
        transition:fly={{
          delay: 750,
          duration: 300,
          x: -800,
          y: -400,
          opacity: 0.5,
          easing: quintOut,
        }}
      >
        <h1 class="text-secondary">Logan Dembicki</h1>
      </div>
      <div
        transition:fly={{
          delay: 1500,
          duration: 300,
          x: 1200,
          y: 1200,
          opacity: 0.5,
          easing: quintOut,
        }}
      >
        and I specialize in:
      </div>
    </div>
  </div>
  <div
    transition:fade={{
      delay: 2000,
      duration: 300,
      easing: quintOut,
    }}
  >
    <div class="pl-6 h-[4.5rem] bg-slate-200 text-black rounded-2xl w-[36rem]">
      <Typewriter>
        {text}
      </Typewriter>
    </div>
  </div>
</h1>
