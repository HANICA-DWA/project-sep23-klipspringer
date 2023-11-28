import { useParams } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { ImageList, ImageListItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
          {profileInfo.bookcase.map((book) => (
            <ImageListItem component={Link} to={`/detailpage/${book._id}`} sx={{ textDecoration: "none", color: "inherit" }} key={book._id}>
              {book.cover_image ? (
                <img style={{ borderRadius: "5px" }} src={`https://covers.openlibrary.org/b/isbn/${book._id}-M.jpg`} alt={book._id} />
              ) : (
                <Stack height="100%" justifyContent="center" alignItems="center" sx={{ border: "1px solid black", borderRadius: "5px" }}>
                  <Stack alignItems="center" justifyContent="center">
                    <ImageNotSupported sx={{ fontSize: 80 }} />
                    <Typography variant="caption">No image found</Typography>
                  </Stack>
                </Stack>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
    </Stack>
  );
}
