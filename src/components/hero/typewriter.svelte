<script>
  import { onMount } from "svelte";

  let texts = [
    "React development",
    "Svelte development",
    "Smart Contracts",
    "Python development",
  ];
  let displayedText = "";
  let index = 0;
  let textIndex = 0;
  const speed = 50; // milliseconds
  const pause = 2000; // milliseconds for pause between words
  let typing = true; // Indicates if typing is in progress

  let showCursor = true;

  // Reactive statement to automatically manage cursor visibility
  $: showCursor = !typing;

  function typeWriter() {
    typing = true; // Typing starts
    if (index < texts[textIndex].length) {
      displayedText += texts[textIndex].charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else {
      typing = false; // Typing ends
      setTimeout(backspace, pause); // Start backspace after a pause
    }
  }

  function backspace() {
    typing = true; // Backspacing is considered typing
    if (displayedText.length > 0) {
      displayedText = displayedText.slice(0, -1);
      setTimeout(backspace, speed);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      index = 0; // reset index for next word
      setTimeout(typeWriter, speed); // Continue typing the next word
    }
  }

  onMount(() => {
    typeWriter();
  });
</script>

<svelte:head>
  <style>
    .typewriter {
      font-family: monospace;
      white-space: pre;
    }
    .cursor {
      display: inline;
      animation: blink-animation 1s steps(2, start) infinite;
      opacity: 0.5;
    }
    .cursorBlink {
      display: inline;
      opacity: 0.5;
    }
    @keyframes blink-animation {
      to {
        visibility: hidden;
      }
    }
  </style>
</svelte:head>

<div class="pl-6 h-[4.5rem] bg-slate-200 rounded-2xl w-[36rem]">
  <span class="typewriter text-[3rem] text-black"
    >{displayedText}{#if showCursor}<span class="cursor">|</span>{:else}<span
        class="cursorBlink">|</span
      >{/if}</span
  >
</div>
