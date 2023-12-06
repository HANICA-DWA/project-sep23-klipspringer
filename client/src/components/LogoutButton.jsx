import { Logout } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

export default function LogoutButton({ setLoggedIn }) {
  const clickHandler = async () => {
    await fetch(import.meta.env.VITE_BACKEND_HOST + "/sessions", {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    setLoggedIn({ loggedIn: false, username: undefined });
  };
  return (
    <Button sx={{margin: "10px"}} variant="text" onClick={clickHandler} endIcon={<Logout style={{ transform: "scale(1.2)" }} />}>
      <Typography variant="body1">Logout</Typography>
    </Button>
  );
}
