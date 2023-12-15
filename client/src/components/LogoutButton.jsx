import { Logout } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/reducers/profileReducer.js";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  const clickHandler = async () => {
    const linkToRedirect = `/${profile._id}`;
    dispatch(logOut());
    navigate(linkToRedirect);
  };
  return (
    <Button sx={{ margin: "10px" }} variant="text" onClick={clickHandler} endIcon={<Logout style={{ transform: "scale(1.2)" }} />}>
      <Typography variant="body1">Logout</Typography>
    </Button>
  );
}
