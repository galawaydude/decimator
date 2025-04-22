import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [userKey, setUserKey] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem("userKey");
    setUserKey(key); // get key from the storage for display
  }, []);

  const handleClearKey = () => {
    setShowConfirm(true); // show the confirm box
  };

  const confirmClear = () => {
    localStorage.removeItem("userKey"); // remove the key
    navigate("/auth"); // and navigate to login
    window.location.href = window.location.href; // hard refresh bandaid to reset
  };

  const cancelClear = () => {
    setShowConfirm(false); // remove the confirm box
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userKey);
    alert("Key copied to clipboard!"); // copy the key 
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">Decimator</div>

      {userKey && (
        <div className="flex items-center gap-4">
          <div className="bg-gray-700 px-2 py-1 rounded text-sm">
            Key: <span className="font-mono">{userKey.slice(0, 6)}...</span>
          </div>
          <button
            onClick={handleClearKey}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Clear Key
          </button>
        </div>
      )}

      {showConfirm && (
        <div className="absolute top-16 right-4 bg-gray-900 border border-gray-700 p-4 rounded shadow-lg z-10 w-64">
          <p className="mb-2 text-sm">Are you sure you want to clear your key?</p>
          <p className="bg-gray-800 text-xs font-mono px-2 py-1 rounded mb-2 break-all">
            {userKey}
          </p>
          <button
            onClick={handleCopy}
            className="text-blue-400 text-sm mb-2 underline"
          >
            Copy Key
          </button>
          <div className="flex justify-end gap-2">
            <button
              onClick={cancelClear}
              className="px-2 py-1 text-sm text-gray-300 border border-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              onClick={confirmClear}
              className="px-2 py-1 text-sm bg-red-600 text-white rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      <div className="space-x-4">
        <Link to="/upload" className="text-white hover:text-gray-300">Upload</Link>
        <Link to="/receive" className="text-white hover:text-gray-300">Receive</Link>
        <Link to="/peers" className="text-white hover:text-gray-300">Peers</Link>
        <Link to="/pins" className="text-white hover:text-gray-300">Pins</Link>
      </div>
      
    </nav>
  );
}

export default Navbar;
