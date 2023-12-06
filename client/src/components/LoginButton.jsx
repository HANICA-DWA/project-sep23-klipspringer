import { Login } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <Button sx={{margin: "10px"}} variant="text" component={Link} to={"/login"} endIcon={<Login style={{ transform: "scale(1.2)" }} />}>
      <Typography variant="body1">Login</Typography>
    </Button>
  );
}
