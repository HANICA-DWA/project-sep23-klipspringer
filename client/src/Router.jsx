import { BrowserRouter, Routes, Route, Outlet, useParams, Navigate } from "react-router-dom";
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
import { CircularProgress, Stack } from "@mui/material";
import Register from "./pages/Register";

export default function Router() {
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false, username: undefined });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setLoggedInStatus = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/sessions/current", {
          credentials: "include",
          mode: "cors",
        });
        if (!response.ok) throw new Error("Fetch failed");
        const result = await response.json();
        setLoggedIn(result);
        setLoading(false);
        return result;
      } catch (err) {
        setLoading(false);
        return false;
      }
    };
    setLoggedInStatus();
  }, []);

  return (
    <LoggedInContext.Provider value={loggedIn}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:userName" element={<ProfileContainer />}>
            <Route path="" element={<Profilepage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
            <Route
              path="shelf"
              element={
                <ProtectedRoute loading={loading}>
                  <ShelfPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":shelf/add"
              element={
                <ProtectedRoute loading={loading}>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register setLoggedIn={setLoggedIn} />} />
          <Route path="/linkedin" element={<LinkedInCallback />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoggedInContext.Provider>
  );
}

function ProfileContainer() {
  const { userName } = useParams();
  const [userExist, setUserExist] = useState(null);

  useEffect(() => {
    const fetchUserExists = async (user) => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_HOST +
          "/user/" +
          user +
          "?" +
          new URLSearchParams({
            fields: ["_id"],
          })
      );
      setUserExist(response.ok);
    };
    fetchUserExists(userName);
  }, [userName]);

  if (userExist === null) {
    return (
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <CircularProgress style={{ width: "15vh", height: "auto" }} />
      </Stack>
    );
  }

  return userExist ? <Outlet /> : <NotFound />;
}
