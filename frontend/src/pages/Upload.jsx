import { useState, useEffect } from "react";
import axios from "axios";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadLogs, setUploadLogs] = useState([]);

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const handleFileChange = async () => {
    try {
      const result = await window.electronAPI.selectFile();
      if (result.filePaths && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        setSelectedFile({ path: filePath });
        setUploadStatus(null);
        setUploadLogs([]);
        setUploadResult(null);
      } else {
        alert("No file selected.");
      }
    } catch (err) {
      console.error("Error selecting file:", err);
      alert("Error selecting file: " + err.message);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file to upload.");

    const filePath = selectedFile.path;
    if (!filePath) return alert("File path not available in Electron.");

    // Get user key from localStorage
    const userKey = localStorage.getItem("userKey");
    if (!userKey) return alert("User key not found. Please authenticate first.");
  
    try {
      setUploadStatus("uploading");
      setUploadLogs([`Starting upload for: ${filePath}`]);
      
      // Pass both filePath and userKey to the upload function
      const response = await window.electronAPI.uploadFile(filePath, userKey);
      console.log("[Frontend] Raw upload response:", response);

      // If response is just a string (CID), create a basic result object
      const result = typeof response === 'string' ? {
        status: 'completed',
        cid: response,
        name: filePath.split(/[\\/]/).pop(),
        details: {}
      } : response;

      console.log("[Frontend] Processed result:", result);

      setUploadResult(result);
      setUploadStatus("completed");
      
      // Add logs based on available information
      const logs = [
        `File processed successfully:`,
        `- File name: ${result.name || 'N/A'}`,
        `- CID: ${result.cid}`,
      ];

      // Add size if available
      if (result.size) {
        logs.push(`- Size: ${formatBytes(result.size)}`);
      }

      // Add details if available
      if (result.details) {
        if (result.details.shardSize) logs.push(`- Shard size: ${formatBytes(result.details.shardSize)}`);
        if (result.details.dataShards) logs.push(`- Data shards: ${result.details.dataShards}`);
        if (result.details.parityShards) logs.push(`- Parity shards: ${result.details.parityShards}`);
        if (result.details.totalChunks) logs.push(`- Total chunks: ${result.details.totalChunks}`);
        if (result.details.processedChunks) logs.push(`- Processed chunks: ${result.details.processedChunks}`);
        if (result.details.createdAt) logs.push(`- Created at: ${new Date(result.details.createdAt).toLocaleString()}`);
      }

      logs.push('', 'Upload completed successfully!');
      setUploadLogs(logs);

    } catch (err) {
      console.error("[Frontend] Upload failed:", err);
      setUploadStatus("failed");
      setUploadLogs(prev => [...prev, `Upload failed: ${err.message}`]);
      alert(`Upload failed: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Files</h2>

        <button 
          onClick={handleFileChange} 
          className="block w-full text-sm text-gray-300 py-2 px-4 rounded bg-gray-700 hover:bg-gray-600 mb-4"
        >
          {selectedFile ? `Selected: ${selectedFile.path}` : "Select File"}
        </button>

        <button
          onClick={handleUpload}
          disabled={uploadStatus === "uploading"}
          className={`w-full mb-4 ${
            uploadStatus === "uploading" 
              ? "bg-gray-600" 
              : "bg-green-600 hover:bg-green-700"
          } text-white font-bold py-2 px-4 rounded`}
        >
          {uploadStatus === "uploading" ? "Uploading..." : "Upload"}
        </button>

        {/* Upload Status and Logs */}
        {uploadStatus && (
          <div className="mt-6 bg-gray-700 p-4 rounded text-sm">
            <div className={`text-lg font-semibold mb-2 ${
              uploadStatus === "completed" ? "text-green-400" : 
              uploadStatus === "failed" ? "text-red-400" : 
              "text-yellow-400"
            }`}>
              Status: {uploadStatus.charAt(0).toUpperCase() + uploadStatus.slice(1)}
            </div>
            
            {/* Upload Logs */}
            <div className="font-mono bg-gray-800 p-3 rounded mt-2 text-xs leading-relaxed">
              {uploadLogs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Result */}
        {uploadResult && uploadStatus === "completed" && (
          <div className="mt-4 bg-gray-700 p-4 rounded text-sm break-words">
            <h3 className="text-lg font-semibold mb-2 text-green-400">Upload Details</h3>
            <div className="grid gap-2">
              <p><span className="font-semibold">CID:</span> 
                <code className="text-green-300 ml-2 bg-gray-800 px-2 py-1 rounded">
                  {uploadResult.cid}
                </code>
              </p>
              
              {uploadResult.name && (
                <p><span className="font-semibold">Name:</span> {uploadResult.name}</p>
              )}
              
              {uploadResult.size && (
                <p><span className="font-semibold">Size:</span> {formatBytes(uploadResult.size)}</p>
              )}
              
              {/* Detailed Information */}
              {uploadResult.details && Object.keys(uploadResult.details).length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-600">
                  <h4 className="font-semibold mb-2">Technical Details:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {uploadResult.details.shardSize && (
                      <p><span className="font-semibold">Shard Size:</span> {formatBytes(uploadResult.details.shardSize)}</p>
                    )}
                    {uploadResult.details.dataShards && (
                      <p><span className="font-semibold">Data Shards:</span> {uploadResult.details.dataShards}</p>
                    )}
                    {uploadResult.details.parityShards && (
                      <p><span className="font-semibold">Parity Shards:</span> {uploadResult.details.parityShards}</p>
                    )}
                    {uploadResult.details.totalChunks && (
                      <p><span className="font-semibold">Total Chunks:</span> {uploadResult.details.totalChunks}</p>
                    )}
                    {uploadResult.details.processedChunks && (
                      <p><span className="font-semibold">Processed:</span> {uploadResult.details.processedChunks}</p>
                    )}
                    {uploadResult.details.createdAt && (
                      <p><span className="font-semibold">Created:</span> {new Date(uploadResult.details.createdAt).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 text-xs text-gray-400">
                Save this CID to recover your file later
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
