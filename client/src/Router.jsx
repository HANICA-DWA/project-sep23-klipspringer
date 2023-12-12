import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profilepage from "./pages/Profilepage";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import ShelfCreatePage from "./pages/ShelfCreatePage";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { useEffect, useState } from "react";
import { LoggedInContext } from "./Contexts";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Register from "./pages/Register";
import Detailpage from "./pages/Detailpage";
import Search from "./pages/Search";
import Bookcase from "./pages/Bookcase";
import ShelfPage from "./pages/ShelfPage";
import AuthorPage from "./pages/AuthorPage";
import AuthorContainer from "./containers/AuthorContainer";
import ShelfContainer from "./containers/ShelfContainer";
import ProfileContainer from "./containers/ProfileContainer";
import Barcode from "./pages/Barcode";
import TermsOfServicePage from "./pages/TermsOfServicePage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";

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
          <Route path="/find" element={<Search setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register setLoggedIn={setLoggedIn} />} />
          <Route path="/linkedin" element={<LinkedInCallback />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/book/:isbn" element={<Detailpage setLoggedIn={setLoggedIn} />} />
          <Route
            path="/author/:author"
            element={
              <AuthorContainer>
                <AuthorPage />
              </AuthorContainer>
            }
          />
          <Route exact path="/:userName" element={<ProfileContainer />}>
            {<Route path="" element={<Profilepage setLoggedIn={setLoggedIn} />} />}
            <Route
              path="shelf"
              element={
                <ProtectedRoute loading={loading}>
                  <ShelfCreatePage />
                </ProtectedRoute>
              }
            />
            <Route path=":shelf" element={<ShelfContainer />}>
              <Route path="" element={<ShelfPage setLoggedIn={setLoggedIn} />} />
              <Route
                path="add"
                element={
                  <ProtectedRoute loading={loading}>
                    <SearchPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit"
                element={
                  <ProtectedRoute loading={loading}>
                    <ShelfCreatePage edit={true} />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="bookcase"
              element={
                <ProtectedRoute loading={loading}>
                  <Bookcase setLoggedIn={setLoggedIn} />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoggedInContext.Provider>
  );
}
