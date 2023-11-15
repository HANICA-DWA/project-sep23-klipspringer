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
    <Stack justifyContent="space-around" style={{ height: "100%" }} spacing={3}>
      <Stack direction="column" alignItems="center">
        <div style={{
          marginTop: "50px",
          marginBottom: "20px",
          padding: "3px",
          border: "1px solid grey",
          borderRadius: "50px"
          }}>
        <Avatar sx={{ width: 56, height: 56 }} alt={profileInfo.name} src={profileInfo.profile_picture} />
          </div>
        <Typography variant="h6" fontWeight="700">
          {profileInfo.name}
        </Typography>
      </Stack>

      {profileInfo.top_three && profileInfo.top_three.length > 0 ? (
        <Bookshelf title="My top 3 books" books={profileInfo.top_three} />
      ) : null}
      {profileInfo.shelf != undefined && profileInfo.shelf.length > 0
        ? profileInfo.shelf.map((shelf) => <Bookshelf key={shelf.name} title={shelf.name} books={shelf.books} />)
        : null}

      <Stack direction="column" alignItems="center">
        <Button variant="contained" style={{ fontSize: "12px", marginBottom: "10px", backgroundColor: "#5B5B5B", color: "#FFFFFF" }}>
          Create your own shelf
        </Button>
      </Stack>
    </Stack>
  );
}
export default Profilepage;
