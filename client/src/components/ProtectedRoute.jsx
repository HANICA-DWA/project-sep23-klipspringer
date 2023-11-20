import { useContext, useEffect } from "react";
import { LoggedInContext } from "../Contexts";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { loggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) navigate("/unauthorized");
  }, [loggedIn]);

  return loggedIn ? props.children : null;
}
