<script>
  import { onMount } from "svelte";
  import axios from "axios"; // For HTTP requests
  import { writable } from "svelte/store"; // Assuming you need to create stores here for demonstration

  // Example Svelte stores (If already defined elsewhere, import them as you originally did)
  export const tempImageLink = writable("");
  export const ipfsImageLink = writable("");

  // Enhanced approach using Svelte's auto-subscription feature ($:)
  let imageUrl =
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-qa2Jgqs09xO0Z74aohcNwVo5/user-M2OfWPliM2A1lIKxRKLLakAY/img-rZuoOYZi4e5Pn2U3Yw0sTOn9.png?st=2024-03-13T02%3A29%3A07Z&se=2024-03-13T04%3A29%3A07Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-13T01%3A49%3A37Z&ske=2024-03-14T01%3A49%3A37Z&sks=b&skv=2021-08-06&sig=jSEO4/oC7oWYoK1EAThLh8ar50/qY9scA2bFfTmcLH8%3D";

  // Automatically update imageUrl when tempImageLink changes
  // $: imageUrl = $tempImageLink;

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

  uploadToIPFS();
</script>
