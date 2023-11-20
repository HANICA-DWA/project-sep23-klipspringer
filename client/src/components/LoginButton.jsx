import { Login } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <Link to={"/login"}>
      <IconButton sx={{margin: "5px"}} >
        <Login/>
      </IconButton>
    </Link>
  );
}
