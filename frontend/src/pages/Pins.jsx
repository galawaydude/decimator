import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Pins = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (cid) => {
    setExpanded((prev) => ({ ...prev, [cid]: !prev[cid] }));
  };

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch("http://localhost:9094/pins");
        if (!response.ok) throw new Error("Failed to fetch pins");

        const text = await response.text();
        const parsed = text
          .split(/\r?\n(?=\{)/)
          .filter((line) => line.trim())
          .map((line) => JSON.parse(line));

        setPins(parsed.filter(pin => pin.name?.trim()));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPins();
  }, []);

  if (loading) return <div className="p-4 text-center text-white">Loading pins...</div>;
  if (error) return <div className="p-4 text-center text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Pinned CIDs</h1>
      <div className="flex flex-col md:flex-row md:flex-wrap items-start gap-6">
        {pins.map((pin, idx) => {
          const cid = pin.cid || `pin-${idx}`;
          const isOpen = expanded[cid];

          return (
            <div
              key={cid}
              className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-lg w-full md:w-[calc(50%-0.75rem)]"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-blue-400">{pin.name || "(no name)"}</h2>
                <button onClick={() => toggleExpand(cid)} className="text-white">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
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

export default Pins;
