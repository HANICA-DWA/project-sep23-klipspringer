import { Logout } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import logout from "../data/logout.js";

export default function LogoutButton({ setLoggedIn }) {
  const clickHandler = async () => {
    logout(setLoggedIn);
  };
  return (
    <Button sx={{ margin: "10px" }} variant="text" onClick={clickHandler} endIcon={<Logout style={{ transform: "scale(1.2)" }} />}>
      <Typography variant="body1">Logout</Typography>
    </Button>
  );
}
