<script>
  import { pbStore } from "svelte-pocketbase";
  pbStore.set(import.meta.env.PUBLIC_POCKETBASE_URL);

  //   {#each $pbStore.data as item}
  //       <li>{item.name} - {item.age}</li>
  //     {/each}
</script>

<template>
  <h1>My PocketBase Data</h1>
  <ul></ul>
</template>
