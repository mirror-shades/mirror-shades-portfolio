<script lang="ts">
  import OpenAI from "openai";
  import { tempImageLink } from "../../lib/state";
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
  $: imageUrl = $tempImageLink;
  let imagePrompt = "";
  let imageLock = false;
  let cost = 0;
  const API = import.meta.env.VITE_OPENAI_API_KEY;
  const JWT = import.meta.env.VITE_PINATA_API_KEY;

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
        if (response.data[0].url) {
          tempImageLink.set(response.data[0].url);
        }
        cost = cost += findPrice();
      } catch {
        alert("Something went wrong, please refresh");
      }
      imageLock = false;
    }
  }

  async function uploadToIPFS(url: string) {
    try {
      const urlStream = await fetch(url);
      const arrayBuffer = await urlStream.arrayBuffer();
      const blob = new Blob([arrayBuffer]);

      const data = new FormData();
      data.append("file", blob);
      const upload = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: data,
        }
      );
      const uploadRes = await upload.json();
      console.log(uploadRes);
    } catch (error) {
      console.log(error);
    }
  }

  function findPrice() {
    if (model === "dall-e-3") {
      if (quality === "standard") {
        if (size === "1024x1024") {
          return 0.04;
        } else {
          //if enlarged size
          return 0.08;
        }
      } else {
        // if HD
        if (size === "1024x1024") {
          return 0.08;
        } else {
          //if hd and enlarged size
          return 0.12;
        }
      }
    } else {
      // if DALL-E-2
      return 0.02;
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

<main class="flex flex-col gap-6 justify-center items-center">
  <div>
    <textarea placeholder="Imagine something..." bind:value={imagePrompt} />
  </div>
  <div>
    {#if !imageLock}
      <button
        class="btn btn-secondary"
        on:click={() => {
          callDallE();
        }}
      >
        Generate
      </button>
    {:else}
      <button class="btn btn-secondary" disabled={true}>
        <span class="loading loading-spinner"></span>
      </button>
    {/if}
    {#if imageUrl && !imageLock}
      <button
        class="btn btn-secondary"
        on:click={() => {
          uploadToIPFS(
            "https://oaidalleapiprodscus.blob.core.windows.net/private/org-qa2Jgqs09xO0Z74aohcNwVo5/user-M2OfWPliM2A1lIKxRKLLakAY/img-aG87N7KF7rstSMrcBvJLGMwk.png?st=2024-03-15T17%3A46%3A34Z&se=2024-03-15T19%3A46%3A34Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-15T06%3A39%3A06Z&ske=2024-03-16T06%3A39%3A06Z&sks=b&skv=2021-08-06&sig=R/%2BT/L2efFQqmCtdK1OyPedIWtFwMuEmKXLq0KgFfSM%3D"
          );
        }}>MINT NFT</button
      >
    {/if}
  </div>
  <div>
    <img alt="" src={imageUrl} />
  </div>
</main>
