import { Button, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateShelfButton() {
  const navigate = useNavigate();
  const profile = useSelector(state => state.profile)
  const { userName } = useParams();

  const shelfClickHandler = profile.loggedIn
    ? () => {
        localStorage.removeItem("book");
        navigate("/" + profile._id + "/shelf");
      }
    : () => navigate("/login");

  return (
    <Stack direction="column" alignItems="center" mt="auto">
      <Button
        variant="contained"
        style={{ fontSize: "12px", marginBottom: "10px", backgroundColor: "#5B5B5B", color: "#FFFFFF" }}
        onClick={shelfClickHandler}
      >
        {profile.loggedIn && userName === profile._id ? "Create another shelf" : "Create your own shelf"}
      </Button>
    </Stack>
  );
}
