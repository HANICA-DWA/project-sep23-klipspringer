import { Box, Stack } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import ProfileLink from "./ProfileLink";
import { useAlert } from "../hooks/useAlert";
import { useNavigate, useParams } from "react-router-dom";
import { HamburgerMenu } from "./HamburgerMenu.jsx";
import NotificationTray from "./NotificationTray.jsx";
import { useSelector } from "react-redux";


export default function Header({  shareButton, backButton, profileInfo }) {
    const profile = useSelector(state => state.profile)
    const { userName } = useParams();
    const navigate = useNavigate();

    const [setShareLinkAlertOn, shareLinkAlert] = useAlert("Link copied to clipboard!");

    return (
      <>
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
          <Box sx={{ margin: "10px" }}>
            <Stack flex flexDirection="row">
              <HamburgerMenu />
              {backButton ? <ArrowBackIosNew sx={{ marginTop: "5px" }} onClick={() => navigate(-1)} /> : null}
              {profile.loggedIn ? <NotificationTray /> : null}
            </Stack>
          </Box>
          {profile.loggedIn && profile._id === userName && shareButton ? (
            <Box>
              <ProfileLink alert={setShareLinkAlertOn} profileInfo={profileInfo} />
            </Box>
          ) : null}
        </Stack>
        {shareLinkAlert}
      </>
    );
}

