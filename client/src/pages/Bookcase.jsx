import { useParams } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ImageList, ImageListItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Bookcover from "../components/Bookcover";

export default function Bookcase({ setLoggedIn }) {
  const userName = useParams().userName;
  const [profileInfo, setProfileInfo] = useState({ bookcase: [] });
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetch(
      import.meta.env.VITE_BACKEND_HOST +
        "/user/" +
        userName +
        "?" +
        new URLSearchParams({
          fields: ["_id", "profile_picture", "name", "bookcase"],
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
    <Stack justifyContent="flex-start" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
      <Header setLoggedIn={setLoggedIn} shareButton={false} />
      <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />
      <Stack>
        <Typography variant="h4" fontWeight="700" textAlign="center">
          My bookcase
        </Typography>
        <ImageList cols={matchDownMd ? 3 : 10} gap={8} sx={{ px: 5 }}>
          {profileInfo.bookcase.map((book) => {
            return (
              <ImageListItem component={Link} to={`/detailpage/${book._id}`} sx={{ textDecoration: "none", color: "inherit" }} key={book._id}>
                <Bookcover isbn={book._id} cover_image={book.cover_image} />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Stack>
    </Stack>
  );
}
