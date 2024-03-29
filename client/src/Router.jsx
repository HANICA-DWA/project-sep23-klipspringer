import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profilepage from "./pages/Profilepage";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import ShelfCreatePage from "./pages/ShelfCreatePage";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { useEffect, useState } from "react";
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
import EditProfilePage from "./pages/EditProfilePage";
import TermsOfServicePage from "./pages/TermsOfServicePage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import { useDispatch } from "react-redux";
import { logUserIn } from "./redux/reducers/profileReducer.js";

export default function Router() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setLoggedInStatus = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/sessions/current", {
          credentials: "include",
          mode: "cors",
        });
        const result = await response.json();
        if (!response.ok || !result.loggedIn) throw new Error("Fetch failed");
        if (result.username) {
          dispatch(
            logUserIn({
              username: result.username,
              cb: () => {
                setLoading(false);
              },
            })
          );
        }
        return result;
      } catch (err) {
        setLoading(false);
        return false;
      }
    };
    setLoggedInStatus();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/find" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/linkedin" element={<LinkedInCallback />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/book/:isbn" element={<Detailpage />} />
        <Route
          path="/author/:author"
          element={
            <AuthorContainer>
              <AuthorPage />
            </AuthorContainer>
          }
        />
        <Route exact path="/:userName" element={<ProfileContainer />}>
          <Route path="" element={<Profilepage />} />
          <Route
            path="edit"
            element={
              <ProtectedRoute loading={loading}>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="shelf"
            element={
              <ProtectedRoute loading={loading}>
                <ShelfCreatePage />
              </ProtectedRoute>
            }
          />
          <Route path=":shelf" element={<ShelfContainer />}>
            <Route path="" element={<ShelfPage />} />
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
                <Bookcase />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
