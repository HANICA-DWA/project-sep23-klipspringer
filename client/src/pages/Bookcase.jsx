import { useParams } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ImageList, ImageListItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  }, [userName]);

  return (
    <Stack justifyContent="flex-start" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
      <Header setLoggedIn={setLoggedIn} shareButton={false} />
      <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />
      <Stack>
        <Typography variant="h4" fontWeight="700" textAlign="center">
          My bookcase
        </Typography>
          {(profileInfo.bookcase && profileInfo.bookcase.length > 0)?null:(
              <Typography variant="h5" textAlign="center">
                  No books in the bookcase, <Link to={"/find"}>add now!</Link>
              </Typography>
          )}
        <ImageList cols={matchDownMd ? 3 : 10} rowHeight={matchDownMd ? 150 : 200} gap={8} sx={{ px: 5 }}>
          {profileInfo.bookcase.map((book) => {
            return (
              <ImageListItem component={Link} to={`/book/${book._id}`} sx={{ textDecoration: "none", color: "inherit" }} key={book._id}>
                <Bookcover isbn={book._id} cover_image={book.cover_image} />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Stack>
    </Stack>
  );
}
