<script>
  import Avatar from "./avatar.svelte";
  import Typewriting from "./typewriting.svelte";
  let unique = {};
</script>

{#key unique}
  <div class="flex w-full">
    <div class="grid w-3/5 flex-grow card rounded-box place-items-center">
      <Typewriting />
    </div>
    <div class="grid w-2/5 flex-grow card rounded-box place-items-center p-3">
      <Avatar />
    </div>
  </div>
{/key}
