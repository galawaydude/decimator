import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export async function uploadFileToIPFS(filePath) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append("file", fileStream);

    console.log("controller filepath: ", filePath);

    const response = await axios.post("http://127.0.0.1:9094/add", formData, {
      headers: formData.getHeaders(),
    });

    return response.data;
  } catch (err) {
    console.error("IPFS Upload Error:", err);
    throw err;
  }
}
