<script>
  import { onMount } from "svelte";
  import axios from "axios"; // For HTTP requests
  import { writable } from "svelte/store"; // Assuming you need to create stores here for demonstration

  // Example Svelte stores (If already defined elsewhere, import them as you originally did)
  export const tempImageLink = writable("");
  export const ipfsImageLink = writable("");

  // Enhanced approach using Svelte's auto-subscription feature ($:)
  let imageUrl;

  // Automatically update imageUrl when tempImageLink changes
  $: imageUrl = $tempImageLink;

  // Improved upload function with better error handling and structure
  export async function uploadToIPFS() {
    try {
      // Fetch the image as a blob
      const imageResponse = await axios.get(imageUrl, { responseType: "blob" });
      const imageBlob = imageResponse.data;

      const file = new File([imageBlob], "uploadedImage.jpg", {
        type: imageBlob.type,
      });

      // FormData to submit the file
      const formData = new FormData();
      formData.append("file", file);

      // Adjusted for readability and security: Avoid hard-coded API keys
      const pinataApiKey = "8fa147f875c4bcdcd761";
      const pinataSecretApiKey = import.meta.env.VITE_PINATA_API_KEY;

      const ipfsResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Successfully uploaded to IPFS and set the new link in the store
      if (ipfsResponse.data.IpfsHash) {
        ipfsImageLink.set(`https://ipfs.io/ipfs/${ipfsResponse.data.IpfsHash}`);
      }
    } catch (error) {
      console.error("Error uploading to IPFS via Pinata:", error);
    }
  }

  // If needed, you can trigger actions on component mount here
  onMount(async () => {
    // e.g., initializing or specific actions on load
  });
</script>
