import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <Link to={"/login"}>
      <Button variant="contained">Log in</Button>
    </Link>
  );
}
