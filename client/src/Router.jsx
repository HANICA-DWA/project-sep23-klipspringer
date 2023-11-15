import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profilepage from "./pages/Profilepage";
import App from "./pages/App";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import { LinkedInCallback } from "react-linkedin-login-oauth2";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/:userName" element={<Profilepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/linkedin" element={<LinkedInCallback />} />
      </Routes>
    </BrowserRouter>
  );
}
