import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GenerateExtension from "./pages/GenerateExtension";
import MyExtensions from "./pages/MyExtensions";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
<<<<<<< HEAD
import Dashboard from "./pages/Dashboard";
=======
import Dashboard from "./components/Dashboard";
>>>>>>> fca4e6d (Initial local snapshot)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<GenerateExtension />} />
        <Route path="/extensions" element={<MyExtensions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;