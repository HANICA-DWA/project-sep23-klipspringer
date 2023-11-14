import { Typography, Button, Avatar, Stack } from "@mui/material";
import Bookshelf from "../components/Bookshelf";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profilepage() {
  const userName = useParams().userName;

  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    fetch(
      import.meta.env.VITE_BACKEND_HOST +
        "/user/" +
        userName +
        "?" +
        new URLSearchParams({
          fields: ["profile_picture", "name", "top_three", "shelf"],
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
    <Stack justifyContent="space-around" style={{ height: "100vh" }}>
      <Stack direction="column" alignItems="center">
        <Avatar alt={profileInfo.name} src={profileInfo.profile_picture} />
        <Typography variant="body2" fontWeight="600">
          {profileInfo.name}
        </Typography>
      </Stack>

      {profileInfo.top_three != undefined && profileInfo.top_three.length > 0 ? (
        <Bookshelf title="My top 3 books" books={profileInfo.top_three} />
      ) : null}
      {profileInfo.shelf != undefined && profileInfo.shelf.length > 0
        ? profileInfo.shelf.map((shelf) => <Bookshelf key={shelf.name} title={shelf.name} books={shelf.books} />)
        : null}

      <Stack direction="column" alignItems="center">
        <Button color="secondary" variant="contained" style={{ fontSize: "12px" }}>
          Create your own shelf
        </Button>
      </Stack>
    </Stack>
  );
}
export default Profilepage;
