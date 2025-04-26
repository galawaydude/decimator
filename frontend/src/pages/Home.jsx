import { useEffect, useState } from "react";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import { getHashedUserKey } from "../utils/KeyHash.mjs";

const Home = () => {
  const [pins, setPins] = useState([]);
  const [hashedKey, setHashedKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (cid) => {
    setExpanded((prev) => ({ ...prev, [cid]: !prev[cid] }));
  };

  useEffect(() => {
    const fetchAndFilterPins = async () => {
      try {
        const userKey = localStorage.getItem("userKey");
        if (!userKey) throw new Error("Missing user key");
        
        // Get hashed version of the key
        const hash = await getHashedUserKey();
        if (!hash) throw new Error("Failed to hash user key");
        
        setHashedKey(hash);
        console.log("Using hashed key:", hash);

        const response = await fetch("http://localhost:9094/pins");
        if (!response.ok) throw new Error("Failed to fetch pins");

        const text = await response.text();
        const parsed = text
          .split(/\r?\n(?=\{)/)
          .filter((line) => line.trim())
          .map((line) => JSON.parse(line))
          .filter((pin) => pin.name && pin.name.startsWith(hash));

        setPins(parsed);
        setLoading(false);
      } catch (err) {
        console.error("Error in fetchAndFilterPins:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAndFilterPins();
  }, []);

  if (loading) return <div className="p-4 text-center text-white">Loading your files...</div>;
  if (error) return <div className="p-4 text-center text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Your Pinned Files</h1>
      <div className="flex flex-col md:flex-row md:flex-wrap items-start gap-6">
        {pins.map((pin, idx) => {
          const cid = pin.cid || `pin-${idx}`;
          const isOpen = expanded[cid];
          // Remove the hashed key prefix from display name
          const displayName = pin.name.replace(`${hashedKey}_`, "");

          return (
            <div
              key={cid}
              className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-lg w-full md:w-[calc(50%-0.75rem)]"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-blue-400">{displayName}</h2>
                <div className="flex gap-2">
                  {/* Download Button */}
                  <button
                    onClick={async () => {
                      const selectedPath = await window.electronAPI.selectFolder();
                      if (selectedPath) {
                        const result = await window.electronAPI.recoverFile(pin.cid, selectedPath);
                        if (result.success) {
                          alert(`File recovered at:\n${result.path}`);
                        } else {
                          alert(`Recovery failed:\n${result.error}`);
                        }
                      }
                    }}
                    className="text-green-300 hover:text-green-400"
                  >
                    <Download size={20} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={async () => {
                      const confirmDelete = confirm(`Are you sure you want to delete CID:\n${pin.cid}?`);
                      if (confirmDelete) {
                        const result = await window.electronAPI.deleteFile(pin.cid);
                        if (result.success) {
                          alert(`Successfully deleted CID:\n${pin.cid}`);
                          window.location.href = window.location.href;
                          // Optionally, you can trigger a refresh here if you want to remove the item from the list
                        } else {
                          alert(`Delete failed:\n${result.error}`);
                        }
                      }
                    }}
                    className="text-red-400 hover:text-red-500"
                  >
                    🗑️
                  </button>

                  {/* Expand/Collapse Button */}
                  <button onClick={() => toggleExpand(cid)} className="text-white">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="font-semibold text-green-300">CID:</p>
                    <p className="text-white text-sm break-all">{pin.cid}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-300">Allocations:</p>
                    <ul className="list-disc list-inside text-sm text-white">
                      {pin.allocations?.map((alloc) => (
                        <li key={alloc} className="break-all">{alloc}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-green-300">Timestamp:</p>
                    <p className="text-white text-sm">{pin.created}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
