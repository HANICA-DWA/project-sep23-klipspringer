import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, loading }) {
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const usernameParams = useParams().userName;

  useEffect(() => {
    if (!loading) {
      if (!profile.loggedIn) {
        navigate("/unauthorized");
      } else if (usernameParams && usernameParams !== profile._id) {
        navigate("/");
      }
    }
  }, [profile.loggedIn, profile._id, usernameParams, loading, navigate]);

  return loading ? null : profile.loggedIn ? children : null;
}
