import { Typography, Button, Avatar, Stack } from "@mui/material";
import Bookshelf from "../components/Bookshelf";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Profilepage() {
  const navigate = useNavigate();
  const userName = useParams().userName;

  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    fetch(
      import.meta.env.VITE_BACKEND_HOST +
        "/user/" +
        userName +
        "?" +
        new URLSearchParams({
          fields: ["_id", "profile_picture", "name", "top_three", "shelf"],
        }),
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setProfileInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Stack justifyContent="flex-start" style={{ minHeight: "100vh" }} spacing={3} useFlexGap>
      <Stack direction="column" alignItems="center">
        <div
          style={{
            marginTop: "50px",
            marginBottom: "20px",
            padding: "3px",
            border: "1px solid grey",
            borderRadius: "50px",
          }}
        >
          <Avatar sx={{ width: 56, height: 56 }} alt={profileInfo.name} src={profileInfo.profile_picture} />
        </div>
        <Typography variant="h6" fontWeight="700">
          {profileInfo.name}
        </Typography>
      </Stack>

      {profileInfo.top_three ? (
        <Bookshelf key={"top_three"} name={"top_three"} title="My top 3 books" books={profileInfo.top_three} user={profileInfo._id} />
      ) : null}
      {profileInfo.shelf != undefined && profileInfo.shelf.length > 0
        ? profileInfo.shelf.map((shelf) => (
            <Bookshelf key={shelf.name} name={shelf._id} title={shelf.name} books={shelf.books} user={profileInfo._id} />
          ))
        : null}

      <Stack direction="column" alignItems="center" mt="auto">
        <Button
          variant="contained"
          style={{ fontSize: "12px", marginBottom: "10px", backgroundColor: "#5B5B5B", color: "#FFFFFF" }}
          onClick={() => navigate("/profile/" + userName + "/shelf")}
        >
          Create your own shelf
        </Button>
      </Stack>
    </Stack>
  );
}
export default Profilepage;
