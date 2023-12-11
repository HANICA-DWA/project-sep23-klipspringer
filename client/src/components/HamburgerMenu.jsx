import {useContext, useState} from "react";
import {LoggedInContext} from "../Contexts.jsx";
import {useNavigate} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu.js";
import {IconButton, Menu, MenuItem} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home.js";
import {Search} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle.js";
import LogoutButton from "./LogoutButton.jsx";
import LoginButton from "./LoginButton.jsx";

export function HamburgerMenu({setLoggedIn}) {
    const {loggedIn, username} = useContext(LoggedInContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <MenuIcon onClick={handleClick}
                      aria-haspopup="true"
                      aria-controls={anchorEl ? 'basic-menu' : undefined}
                      aria-expanded={anchorEl ? 'true' : undefined}
                      sx={{
                          marginRight: "10px",
                      }}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={anchorEl ? true : false}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => navigate("/")}>
                    <IconButton sx={{color: "black"}}>
                        <HomeIcon fontSize="medium"/>
                    </IconButton>
                    Home</MenuItem>
                <MenuItem onClick={() => navigate("/find")}>
                    <IconButton sx={{color: "black"}}>
                        <Search fontSize="medium"/>
                    </IconButton>
                    Search
                </MenuItem>
                {loggedIn ? (
                    <MenuItem onClick={() => navigate("/" + username)}>
                        <IconButton sx={{color: "black"}}>
                            <AccountCircleIcon fontSize="medium"/>
                        </IconButton>
                        Profile
                    </MenuItem>
                ) : null}
                {loggedIn ? (
                    <MenuItem onClick={() => navigate("/" + username + "/bookcase")}>Bookcase</MenuItem>
                ) : null}
                <MenuItem>{loggedIn ? <LogoutButton setLoggedIn={setLoggedIn}/> : <LoginButton/>}</MenuItem>
            </Menu>
        </>
    )
}