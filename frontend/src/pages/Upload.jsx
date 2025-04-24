import { useState, useEffect } from "react";
import axios from "axios";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = async () => {
    console.log("clicked");
    try {
      // Use Electron's dialog to select a file
      const result = await window.electronAPI.selectFile();
      if (result.filePaths && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];

        console.log(filePath);

        setSelectedFile({ path: filePath });

      } else {
        alert("No file selected.");
      }
    } catch (err) {
      console.error("Error selecting file:", err);
    }
  };

  // useEffect to log when selectedFile changes
  useEffect(() => {
    if (selectedFile) {
      console.log("Updated selectedFile:", selectedFile);
    }
  }, [selectedFile]);  // Runs when selectedFile changes
  

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file to upload.");

    const filePath = selectedFile.path; // works only in Electron (not in browser)
    if (!filePath) return alert("File path not available in Electron.");
  
    try {
      
      const result = await window.electronAPI.uploadFile(filePath);
      console.log("Upload success:", result);
      setUploadResult(result);

      console.log(result);

    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Files</h2>

        {/* <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
        /> */}

        <button onClick={handleFileChange} className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700">
          {/* Select File */}
          {selectedFile ? `Selected: ${selectedFile.path.split('/').pop()}` : "Select File"}

        </button>

        <button
          onClick={handleUpload}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>

        {uploadResult && (
          <div className="mt-6 bg-gray-700 p-4 rounded text-sm break-words">
            <p><span className="font-semibold">Name:</span> {uploadResult.name}</p>
            <p><span className="font-semibold">CID:</span> <code className="text-green-300">{uploadResult.cid}</code></p>
            <p><span className="font-semibold">Size:</span> {uploadResult.size} bytes</p>
            {uploadResult.allocations && uploadResult.allocations.length > 0 && (
              <>
                <p><span className="font-semibold">Allocated to peers:</span></p>
                <ul className="list-disc ml-6 text-gray-300">
                  {uploadResult.allocations.map((peerId, idx) => (
                    <li key={idx}>{peerId}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
