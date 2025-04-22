import { uploadToIPFS } from "../utils/ipfsClient.mjs"; // old file for testing, remove if done

export const handleFileUpload = async (filePath) => {
  try {
    console.log("Uploading file:", filePath);
    const result = await uploadToIPFS(filePath);  // Upload the file to IPFS
    return result;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};