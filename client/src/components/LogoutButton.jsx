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
    <Button variant="contained" onClick={clickHandler}>
      Log out
    </Button>
  );
}
