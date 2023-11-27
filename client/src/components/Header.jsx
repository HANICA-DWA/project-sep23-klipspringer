import { useContext } from "react";
import { LoggedInContext } from "../Contexts";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { Stack } from "@mui/material";
import ProfileLink from "./ProfileLink";
import { useAlert } from "../hooks/useAlert";

export default function Header({ setLoggedIn }) {
  const loggedIn = useContext(LoggedInContext).loggedIn;

  const [setShareLinkAlertOn, shareLinkAlert] = useAlert("Link copied to clipboard!");

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        {loggedIn ? <ProfileLink alert={setShareLinkAlertOn}/> : <div></ div>}
        {loggedIn ? <LogoutButton setLoggedIn={setLoggedIn} /> : <LoginButton />}
      </Stack>
      {shareLinkAlert}
    </>
  );
}
