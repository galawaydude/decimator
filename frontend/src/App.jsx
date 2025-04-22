import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Upload from "./pages/Upload.jsx";
import Receive from "./pages/Receive.jsx";
import Navbar from "./components/Navbar.jsx";
import KeyGate from "./pages/KeyGate.jsx";

function App() {
  const userKey = localStorage.getItem("userKey"); // get the key from the local storage for conditional routing

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
      </Routes>
    </Router>
  );
}

export default App;
