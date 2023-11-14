import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Profilepage from "./pages/Profilepage";
import SearchPage from "./pages/SearchPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
