import {useContext} from "react";
import {LoggedInContext} from "../Contexts";
import {Box, Stack} from "@mui/material";
import {ArrowBackIosNew} from "@mui/icons-material";
import ProfileLink from "./ProfileLink";
import {useAlert} from "../hooks/useAlert";
import {useNavigate, useParams} from "react-router-dom";
import {HamburgerMenu} from "./HamburgerMenu.jsx";


export default function Header({setLoggedIn, shareButton, backButton}) {
    const {loggedIn, username} = useContext(LoggedInContext);
    const {userName} = useParams();
    const navigate = useNavigate();

    const [setShareLinkAlertOn, shareLinkAlert] = useAlert("Link copied to clipboard!");

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                {backButton ? (
                    <Box sx={{flex: "1 1 0px", width: "0px", textAlign: "start"}}>
                        <ArrowBackIosNew sx={{margin: "20px"}} onClick={() => navigate(-1)}/>
                    </Box>
                ) : loggedIn && username === userName && shareButton ? (
                    <Box sx={{flex: "1 1 0px", width: "0px", textAlign: "start"}}>
                        <ProfileLink alert={setShareLinkAlertOn}/>
                    </Box>
                ) : (
                    <Box sx={{flex: "1 1 0px"}}>
                        <div></div>
                    </Box>
                )}
                <Box sx={{flex: "1 1 0px", width: "0px", textAlign: "center"}}>

                </Box>
                <Box sx={{flex: "1 1 0px", width: "0px", textAlign: "end"}}>
                    <HamburgerMenu setLoggedIn={setLoggedIn}/>
                </Box>
            </Stack>
            {shareLinkAlert}
        </>
    );
}

