import { useContext } from "react";
import { LoggedInContext } from "../Contexts";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { Box, IconButton, Stack } from "@mui/material";
import { Search, ArrowBackIosNew } from "@mui/icons-material";
import ProfileLink from "./ProfileLink";
import { useAlert } from "../hooks/useAlert";
import { useNavigate, useParams } from "react-router-dom";

export default function Header({ setLoggedIn, shareButton, backButton }) {
  const { loggedIn, username } = useContext(LoggedInContext);
  const { userName } = useParams();
  const navigate = useNavigate();

  const [setShareLinkAlertOn, shareLinkAlert] = useAlert("Link copied to clipboard!");

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
        {backButton && (
          <Box sx={{ flex: "1 1 0px", width: "0px", textAlign: "start" }}>
            <ArrowBackIosNew sx={{ margin: "20px" }} onClick={() => navigate(-1)} />
          </Box>
        )}
        {loggedIn && username === userName && shareButton ? (
          <Box sx={{ flex: "1 1 0px", width: "0px", textAlign: "start" }}>
            <ProfileLink alert={setShareLinkAlertOn} />
          </Box>
        ) : (
          <Box sx={{ flex: "1 1 0px" }}>
            <div></div>
          </Box>
        )}
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
