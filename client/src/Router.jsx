import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profilepage from "./pages/Profilepage";
import App from "./pages/App";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import ShelfPage from "./pages/ShelfPage";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { useState } from "react";
import { LoggedInContext } from "./Contexts";

export default function Router() {
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, username: "" });
  return (
    <LoggedInContext.Provider value={loggedIn}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:userName" element={<Profilepage />} />
          <Route path="/profile/:userName/shelf" element={<ShelfPage />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/linkedin" element={<LinkedInCallback />} />
        </Routes>
      </BrowserRouter>
    </LoggedInContext.Provider>
  );
}
