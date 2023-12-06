import { useContext } from "react";
import { LoggedInContext } from "../Contexts";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { Box, IconButton, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";
import ProfileLink from "./ProfileLink";
import { useAlert } from "../hooks/useAlert";
import { useNavigate, useParams } from "react-router-dom";

export default function Header({ setLoggedIn, shareButton }) {
  const { loggedIn, username } = useContext(LoggedInContext);
  const { userName } = useParams();
  const navigate = useNavigate();

  const [setShareLinkAlertOn, shareLinkAlert] = useAlert("Link copied to clipboard!");

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
        <Box sx={{ flex: "1 1 0px", width: "0px", textAlign: "start" }}>
          {loggedIn && username === userName && shareButton ? <ProfileLink alert={setShareLinkAlertOn} /> : <div></div>}
        </Box>
        <Box sx={{ flex: "1 1 0px", width: "0px", textAlign: "center" }}>
          <IconButton onClick={() => navigate("/find")} sx={{ color: "black" }}>
            <Search fontSize="large" />
          </IconButton>
        </Box>
        <Box sx={{ flex: "1 1 0px", width: "0px", textAlign: "end" }}>{loggedIn ? <LogoutButton setLoggedIn={setLoggedIn} /> : <LoginButton />}</Box>
      </Stack>
      {shareLinkAlert}
    </>
  );
}
