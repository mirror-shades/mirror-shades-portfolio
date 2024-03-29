

  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNjEzMTY3Yy1jMjZjLTQyZmQtYTM2YS1lZmFlYjBiNTg2ZjAiLCJlbWFpbCI6ImxvZ2FuLmRlbWJpY2tpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJmOWM2Y2JjOWViM2FkZjgzZTQzNCIsInNjb3BlZEtleVNlY3JldCI6ImUxMzZjMTE2ZmVmNDdiZDQyOGRhZmIwYWEyN2E5ODE4NjZlNWQ2Njg5MzhkNTRmNGFkY2UzYTU5MmRkMGY5MzEiLCJpYXQiOjE3MTA0NTI0NTB9.BL5st6BecHAh0QUlTi_TQfIsqhxhOQEy1m2P0CP6Zuw";

export default async function uploadToIPFS(url) {
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
