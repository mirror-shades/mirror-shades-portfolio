<script lang="ts">
  import Typewriter from "svelte-typewriter";
  let text: any;
  $: text = "React development";
  let textSelection = [
    "React development",
    "Svelte development",
    "Smart Contracts",
    "Python development",
  ];
  let ticker = 1;
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
  Logan Dembicki
  <br />
  specializes in
  <Typewriter>
    {text}
  </Typewriter>
</h1>

<style>
  h1 {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans";
    font-size: xxx-large;
  }
</style>
