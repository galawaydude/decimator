import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Upload from "./pages/Upload.jsx";
import Receive from "./pages/Receive.jsx";
import Navbar from "./components/Navbar.jsx";
import KeyGate from "./pages/KeyGate.jsx";
import { useEffect } from "react";
import Peers from "./pages/Peers.jsx";
import Pins from "./pages/Pins.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const userKey = localStorage.getItem("userKey"); // get the key from the local storage for conditional routing

  // useEffect(() => {
  //   if (window.electronAPI) {
  //     console.log("electronAPI available");

  //     // Send a message to Electron main
  //     window.electronAPI.sendMessage("Hello from frontend!");

  //     // Listen for response
  //     window.electronAPI.onMessage((_event, msg) => {
  //       console.log("Received from Electron:", msg);
  //     });
  //   } else {
  //     console.log("ElectronAPI not available");
  //   }
  // }, []);

  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Navigate to={userKey ? "/upload" : "/auth"} />} />
        {/* if user has key, go to /upload (or any other page); else go to /auth */}
        <Route path="/auth" element={<KeyGate />} />
        <Route
          path="/upload"
          element={userKey ? <Upload /> : <Navigate to="/auth" />}
        />
        <Route
          path="/receive"
          element={userKey ? <Receive /> : <Navigate to="/auth" />}
        />
        <Route
        path="/peers"
        element={userKey ? <Peers /> : <Navigate to="/auth" />}
        />
        <Route
        path="/pins"
        element={userKey ? <Pins /> : <Navigate to="/auth" />}
        />
        <Route
        path="/home"
        element={userKey ? <Home /> : <Navigate to="/auth" />}
        />

      </Routes>
    </Router>
  );
}

export default App;
