import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profilepage from "./pages/Profilepage";
import App from "./pages/App";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/:userName" element={<Profilepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
