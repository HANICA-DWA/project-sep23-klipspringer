import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";

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
    <Button sx={{margin: "5px"}} size="small" variant="contained" onClick={clickHandler}>
      <Logout/>
    </Button>
  );
}
