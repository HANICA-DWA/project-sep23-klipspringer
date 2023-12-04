import { Button, Stack } from "@mui/material";
import { useContext } from "react";
import { LoggedInContext } from "../Contexts";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateShelfButton() {
  const navigate = useNavigate();
  const { loggedIn, username } = useContext(LoggedInContext);
  const { userName } = useParams();

  const shelfClickHandler = loggedIn
    ? () => {
        localStorage.removeItem("book");
        navigate("/" + username + "/shelf");
      }
    : () => navigate("/login");

  return (
    <Stack direction="column" alignItems="center" mt="auto">
      <Button
        variant="contained"
        style={{ fontSize: "12px", marginBottom: "10px", backgroundColor: "#5B5B5B", color: "#FFFFFF" }}
        onClick={shelfClickHandler}
      >
        {loggedIn && userName === username ? "Create another shelf" : "Create your own shelf"}
      </Button>
    </Stack>
  );
}
