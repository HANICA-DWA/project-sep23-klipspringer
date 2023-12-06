import { useContext, useEffect } from "react";
import { LoggedInContext } from "../Contexts";
import { useNavigate, useParams } from "react-router-dom";

export default function ProtectedRoute({ children, loading }) {
  const { loggedIn, username } = useContext(LoggedInContext);
  const navigate = useNavigate();
  const usernameParams = useParams().userName;

  useEffect(() => {
    if (!loading) {
      if (!loggedIn) {
        navigate("/unauthorized");
      } else if (usernameParams && usernameParams !== username) {
        navigate("/");
      }
    }
  }, [loggedIn, username, usernameParams, loading, navigate]);

  return loading ? null : loggedIn ? children : null;
}
