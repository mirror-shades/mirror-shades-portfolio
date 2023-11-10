<script>
  import ChatBot from "./chatbot.svelte";
  import ImageGen from "./imagegen.svelte";
  let chatbot = true;
</script>

<!--Navbar-->
<div class="w-full z-50 shadow-2xl flex flex-col">
  <div class="navbar gap-2">
    <div class="navbar-start" />
    <div class="navbar-center">
      <button class={chatbot ? "btn" : "btn"} on:click={() => (chatbot = true)}
        >Chatbot
      </button>
      <div style="width:15px" />
      <button
        class={!chatbot ? "btn" : "btn"}
        on:click={() => (chatbot = false)}
      >
        ImageBot
      </button>
    </div>
    <div class="navbar-end" />
  </div>
</div>

<!--Body-->
<div class="grid z-1 h-screen place-items-center">
  <div class="card highlight w-3/4 bg-base-100 shadow-xl">
    <div class="card-body items-center">
      {#if chatbot}
        <ChatBot />
      {:else}
        <ImageGen />
      {/if}
    </div>
  </div>
</div>
