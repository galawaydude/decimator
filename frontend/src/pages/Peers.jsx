import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Peers = () => {
  const [peerData, setPeerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const response = await fetch("http://localhost:9094/peers");
        if (!response.ok) throw new Error("Failed to fetch peer data");

        const text = await response.text();
        const parsed = text
          .split(/\r?\n(?=\{)/)
          .filter((line) => line.trim())
          .map((line) => JSON.parse(line));

        setPeerData(parsed);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPeers();
  }, []);

  if (loading) return <div className="p-4 text-center text-white">Loading peers...</div>;
  if (error) return <div className="p-4 text-center text-red-400">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-400">Cluster Peer Addresses</h1>
      <div className="flex flex-col md:flex-row md:flex-wrap items-start gap-6">
        {peerData.map((peer, idx) => {
          const peerId = peer.id || `peer-${idx}`;
          const isOpen = expanded[peerId];

          return (
            <div
              key={peerId}
              className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-lg w-full md:w-[calc(50%-0.75rem)]"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-cyan-400">Peer ID:</h2>
                <button onClick={() => toggleExpand(peerId)} className="text-white">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              <p className="mt-2 text-white break-all text-sm">{peer.id}</p>

              {isOpen && (
                <>
                  <div className="mt-4">
                    <p className="font-semibold text-green-300">Cluster Peers:</p>
                    <ul className="list-disc list-inside text-sm text-white mt-1">
                      {peer.cluster_peers?.map((cp) => (
                        <li key={cp} className="break-all">{cp}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold text-green-300">Cluster Peer Addresses:</p>
                    <ul className="list-disc list-inside text-sm text-white mt-1">
                      {peer.cluster_peers_addresses?.map((addr) => (
                        <li key={addr} className="break-all">{addr}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Peers;
