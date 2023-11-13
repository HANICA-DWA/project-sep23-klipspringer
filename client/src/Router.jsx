import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Profilepage from "./pages/Profilepage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profilepage />} />
      </Routes>
    </BrowserRouter>
  );
}
