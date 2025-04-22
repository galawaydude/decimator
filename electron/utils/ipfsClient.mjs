import fs from "fs";
import axios from "axios";

export async function uploadToIPFS(filePath) {
  const fileStream = fs.createReadStream(filePath);

  console.log("ipfsclient: ", filePath);
  console.log(fileStream);
  const response = await axios.post("http://127.0.0.1:9094/add", fileStream, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
