import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import { LoggedInContext } from "../Contexts";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

function App({ setLoggedIn }) {
  const loggedIn = useContext(LoggedInContext).loggedIn;

  return (
    <>
      {loggedIn ? <LogoutButton setLoggedIn={setLoggedIn} /> : <LoginButton />}
    </>
  );
}

export default App;
