<script lang="ts">
  import Name from "./name.svelte";
  import Typewriter from "svelte-typewriter";
  import { fly } from "svelte/transition";
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
    {#each lines as line, i}
      <div class="overflow">
        <div
          transition:fly={{
            delay: 250,
            duration: 300,
            x: 100,
            y: 500,
            opacity: 0.5,
            easing: quintOut,
          }}
        >
          {@html line}
        </div>
      </div>
    {/each}
  </div>
  <div class="pl-6 h-[4.5rem] bg-slate-200 text-black rounded-2xl w-[36rem]">
    <Typewriter>
      {text}
    </Typewriter>
  </div>
</h1>
