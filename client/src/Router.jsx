import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profilepage from "./pages/Profilepage";
import App from "./pages/App";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import ShelfPage from "./pages/ShelfPage";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { useEffect, useState } from "react";
import { LoggedInContext } from "./Contexts";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

export default function Router() {
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, username: undefined });

  useEffect(() => {
    const setLoggedInStatus = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/sessions/current", {
        credentials: "include",
        mode: "cors",
      });
      const result = await response.json();
      setLoggedIn(result);
      return result;
    };
    setLoggedInStatus();
  }, []);

  return (
    <LoggedInContext.Provider value={loggedIn}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App setLoggedIn={setLoggedIn} />} /> */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:shelf" element={<SearchPage />} />
          <Route path="/profile/:userName" element={<Profilepage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
          <Route path="/profile/:userName/shelf" element={<ShelfPage />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/linkedin" element={<LinkedInCallback />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoggedInContext.Provider>
  );
}
