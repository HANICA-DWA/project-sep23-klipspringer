import { Typography, Button, Avatar, Stack } from "@mui/material";
import Bookshelf from "../components/Bookshelf";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoggedInContext } from "../Contexts";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";

function Profilepage({ setLoggedIn }) {
  const navigate = useNavigate();
  const userName = useParams().userName;
  const { loggedIn, username } = useContext(LoggedInContext);
  const [profileInfo, setProfileInfo] = useState([]);

  const shelfClickHandler = loggedIn ? () => navigate("/" + username + "/shelf") : () => navigate("/login");

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
    <>
      <Stack justifyContent="flex-start" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
        <Header setLoggedIn={setLoggedIn} shareButton={true} />
        <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />

        {profileInfo.top_three ? (
          <Bookshelf key={"top_three"} id={"top_three"} title="My top 3 books" books={profileInfo.top_three} user={profileInfo._id} />
        ) : null}
        {profileInfo.shelf != undefined && profileInfo.shelf.length > 0
          ? profileInfo.shelf.map((shelf) => (
              <Bookshelf key={shelf._id} id={shelf._id} title={shelf.name} books={shelf.books} user={profileInfo._id} />
            ))
          : null}

        <Stack direction="column" alignItems="center" mt="auto">
          <Button
            variant="contained"
            style={{ fontSize: "12px", marginBottom: "10px", backgroundColor: "#5B5B5B", color: "#FFFFFF" }}
            onClick={shelfClickHandler}
          >
            {loggedIn && userName === username ? "Create another shelf" : "Create your own shelf"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
export default Profilepage;
