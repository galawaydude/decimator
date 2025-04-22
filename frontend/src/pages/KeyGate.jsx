// src/pages/KeyGate.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function generateRandomKey() {
  return [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
}

const KeyGate = () => {
  const [key, setKey] = useState("");
  const [generated, setGenerated] = useState(false);
  const navigate = useNavigate();

  const handleKeySubmit = () => {
    if (!key) return alert("Please enter or generate a key.");
    localStorage.setItem("userKey", key); // set the key on local storage
    window.location.href = "/upload";  // bandaid fix to go to the upload page
  };

  const handleGenerate = () => {
    const newKey = generateRandomKey();
    setKey(newKey); // show the generated keyl
    setGenerated(true);    
};

  const handleCopy = () => {
    navigator.clipboard.writeText(key);
    alert("Key copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white gap-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Decimator</h1>

      <input
        className="p-2 w-72 rounded text-black"
        placeholder="Enter your user key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          onClick={handleKeySubmit}
        >
          Continue
        </button>

        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={handleGenerate}
        >
          Generate Key
        </button>
      </div>

      {generated && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-sm text-gray-300">Your new key:</p>
          <div className="bg-gray-800 p-2 px-4 rounded text-green-400 font-mono">
            {key}
          </div>
          <button
            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm"
            onClick={handleCopy}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default KeyGate;
