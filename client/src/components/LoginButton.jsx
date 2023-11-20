import { Login } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <Link to={"/login"}>
      <Button sx={{margin: "5px"}} size="small" variant="contained">
        <Login/>
      </Button>
    </Link>
  );
}
