<script lang="ts">
  import OpenAI from "openai";
  import AiNavbar from "./aiNavbar.svelte";
  let model = "dall-e-3";
  let size:
    | "1024x1024"
    | "256x256"
    | "512x512"
    | "1792x1024"
    | "1024x1792"
    | null
    | undefined = "1024x1024";
  let quality: string | undefined = "standard";
  let image_url: string | undefined = "";
  let imagePrompt = "";
  let imageLock = false;
  const API = import.meta.env.VITE_OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: API, dangerouslyAllowBrowser: true });

  async function callDallE() {
    if (imagePrompt === "") {
      alert("Please input a prompt");
      return 0;
    }
    if (imageLock === false) {
      imageLock = true;
      try {
        const response = await openai.images.generate({
          model: model,
          prompt: imagePrompt,
          n: 1,
          size: size,
        });
        image_url = response.data[0].url;
      } catch {
        alert("Something went wrong, please refresh");
      }
      imageLock = false;
    }
  }

  const handleChange = () => {
    if (model === "dall-e-3") {
      size = "1024x1024";
      quality = "standard";
    }
    if (model === "dall-e-2") {
      size = "512x512";
      quality = undefined;
    }
  };
</script>

<!--imagebot-->
<h1>ImageBot</h1>

<select
  bind:value={model}
  on:change={() => {
    handleChange();
  }}
>
  <option value="dall-e-3">Dall-E 3</option>
  <option value="dall-e-2">Dall-E 2</option>
</select>
{#if model === "dall-e-2"}
  <select bind:value={size}>
    <option value="512x512">512x512</option>
    <option value="1024x1024">1024x1024</option>
  </select>
{/if}
{#if model === "dall-e-3"}
  <select bind:value={size}>
    <option value="1024x1024">1024x1024</option>
    {#if quality === "standard"}
      <option value="1024x1792">1024x1792</option>
      <option value="1792x1024">1792x1024</option>
    {/if}
  </select>

  <select bind:value={quality}>
    <option value="standard">Standard</option>
    <option value="hd">HD</option>
  </select>
{/if}

<input bind:value={imagePrompt} />
<button
  class="btn"
  on:click={() => {
    callDallE();
  }}>{imageLock ? "Generating..." : "Generate"}</button
>

<img alt="" src={image_url} />

<style>
  input {
    border: 1px solid black;
    margin: 5px;
  }
</style>
