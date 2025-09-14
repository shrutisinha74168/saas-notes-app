import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Upgrade from "./pages/Upgrade";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} /> {/* redirect to /notes */}
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/upgrade" element={<Upgrade />} />
      </Routes>
    </>
  );
}

export default App;
