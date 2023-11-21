<script lang="ts">
  import { chatbot } from "../../lib/state";
</script>

<div class="w-full z-50 shadow-2xl flex flex-col">
  <div class="navbar gap-2">
    <div class="navbar-start" />
    <div class="navbar-center">
      <button
        class={$chatbot ? "btn" : "btn"}
        on:click={() => chatbot.set(true)}
        >Chatbot
      </button>
      <div style="width:15px" />
      <button
        class={!$chatbot ? "btn" : "btn"}
        on:click={() => chatbot.set(false)}
      >
        ImageBot
      </button>
    </div>
    <div class="navbar-end" />
  </div>
</div>
