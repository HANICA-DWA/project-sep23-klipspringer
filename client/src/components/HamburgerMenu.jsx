import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu.js";
import { IconButton, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home.js";
import { Search, LibraryBooks, ManageAccounts } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle.js";
import LogoutButton from "./LogoutButton.jsx";
import LoginButton from "./LoginButton.jsx";
import { useSelector } from "react-redux";

export function HamburgerMenu() {
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <MenuIcon
        onClick={handleClick}
        aria-haspopup="true"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-expanded={anchorEl ? "true" : undefined}
        data-testid="hamburger-menu-icon"
        sx={{
          marginRight: "10px",
        }}
      />
      <Menu id="basic-menu" anchorEl={anchorEl} open={anchorEl ? true : false} onClose={() => setAnchorEl(null)}>
        {profile.loggedIn ? (
          <MenuItem onClick={() => navigate("/" + profile._id)}>
            <IconButton sx={{ color: "black" }}>
              <AccountCircleIcon fontSize="medium" />
            </IconButton>
            Profile
          </MenuItem>
        ) : (
          <MenuItem onClick={() => navigate("/")}>
            <IconButton sx={{ color: "black" }}>
              <HomeIcon fontSize="medium" />
            </IconButton>
            Home
          </MenuItem>
        )}
        {profile.loggedIn && (
          <MenuItem onClick={() => navigate(`/${profile._id}/edit`)}>
            <IconButton sx={{ color: "black" }}>
              <ManageAccounts />
            </IconButton>
            Edit profile
          </MenuItem>
        )}
        <MenuItem onClick={() => navigate("/find")}>
          <IconButton sx={{ color: "black" }}>
            <Search fontSize="medium" />
          </IconButton>
          Search
        </MenuItem>
        {profile.loggedIn ? (
          <MenuItem onClick={() => navigate("/" + profile._id + "/bookcase")}>
            <IconButton sx={{ color: "black" }}>
              <LibraryBooks fontSize="medium" />
            </IconButton>
            Bookcase
          </MenuItem>
        ) : null}
        <MenuItem>{profile.loggedIn ? <LogoutButton /> : <LoginButton />}</MenuItem>
      </Menu>
    </>
  );
}
