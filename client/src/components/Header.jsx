import { useContext } from "react";
import { LoggedInContext } from "../Contexts";
import { Box, Stack } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import ProfileLink from "./ProfileLink";
import { useAlert } from "../hooks/useAlert";
import { useNavigate, useParams } from "react-router-dom";
import { HamburgerMenu } from "./HamburgerMenu.jsx";
import NotificationTray from "./NotificationTray.jsx";


export default function Header({ setLoggedIn, shareButton, backButton }) {
    const { loggedIn, username } = useContext(LoggedInContext);
    const { userName } = useParams();
    const navigate = useNavigate();

    const [setShareLinkAlertOn, shareLinkAlert] = useAlert("Link copied to clipboard!");

    return (
      <>
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
          <Box sx={{ margin: "10px" }}>
            <Stack flex flexDirection="row">
              <HamburgerMenu setLoggedIn={setLoggedIn} />
              {backButton ? <ArrowBackIosNew sx={{ marginTop: "5px" }} onClick={() => navigate(-1)} /> : null}
              {loggedIn ? <NotificationTray /> : null}
            </Stack>
          </Box>
          {loggedIn && username === userName && shareButton ? (
            <Box>
              <ProfileLink alert={setShareLinkAlertOn} />
            </Box>
          ) : null}
        </Stack>
        {shareLinkAlert}
      </>
    );
}

