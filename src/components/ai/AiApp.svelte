<script lang="ts">
  import ChatBot from "./chatbot.svelte";
  import ImageGen from "./imagegen.svelte";
  import { chatbot } from "../../lib/state";
  import AiNavbar from "./aiNavbar.svelte";
</script>

<!--Body-->
<div class="grid relative z-1 place-items-center">
  <div class="card highlight w-3/4 bg-base-100 shadow-xl">
    <div class="card-body items-center">
      {#if $chatbot}
        <ChatBot />
      {:else}
        <ImageGen />
      {/if}
    </div>
  </div>
</div>
