import { Button, Stack, Typography, Box } from "@mui/material";
import Bookshelf from "../components/Bookshelf";
import {useContext, useEffect, useRef, useState} from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import CreateShelfButton from "../components/CreateShelfButton";
import getProfileData from "../data/getProfileData";
import ModalFollowers from "../components/ModalFollowers";
import { LoggedInContext } from "../Contexts";
import { getWebSocket } from "../data/websockets";

function Profilepage({ setLoggedIn }) {
  const userName = useParams().userName;
  const location = useLocation();
  const { loggedIn, username } = useContext(LoggedInContext);
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [valueTabs, setValueTabs] = useState("");

  const handleOpen = (tab) => {
    setOpen(true);
    setValueTabs(tab);
  };
  const handleClose = () => setOpen(false);


  useEffect(() => {
    const getFunction = async () => {
      const profileData = await getProfileData(userName, ["_id", "profile_picture", "name", "top_three", "shelf", "followers", "following"]);
      setProfileInfo(profileData);
    };
    getFunction();
  }, [userName, location]);

  function handleFollow() {
    if (profileInfo.followers.find((name) => name._id === username)) {
      fetch(import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "/unfollow", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ account: userName }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setProfileInfo(res);
          getWebSocket().send(JSON.stringify({ type: "notification_unfollow", following: userName, link: `/${username}` }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "/follow", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ account: userName }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setProfileInfo(res);
          getWebSocket().send(JSON.stringify({ type: "notification_follow", following: userName, link: `/${username}` }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
        <Header setLoggedIn={setLoggedIn} shareButton={true} profileInfo={profileInfo} />
        <Stack direction="row" justifyContent="space-evenly" width="100%">
          <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />
          <Stack justifyContent="center">
            <Stack direction="row">
              <Stack alignItems="center" margin="5px" onClick={() => handleOpen("followers")}>
                <Typography variant="caption">Followers</Typography>
                <Typography>{profileInfo.followers ? profileInfo.followers.length : null}</Typography>
              </Stack>
              <Stack alignItems="center" margin="5px" onClick={() => handleOpen("following")}>
                <Typography variant="caption">Following</Typography>
                <Typography>{profileInfo.following ? profileInfo.following.length : null}</Typography>
              </Stack>
            </Stack>
            {username !== userName && loggedIn ? (
              <Button variant="contained" onClick={handleFollow}>
                {profileInfo.followers ? (profileInfo.followers.find((name) => name._id === username) ? "Unfollow" : "Follow") : null}
              </Button>
            ) : !loggedIn ? (
              <Button variant="contained" onClick={() => navigate("/login")}>
                Follow
              </Button>
            ) : null}
            <ModalFollowers
              open={open}
              handleClose={handleClose}
              valueTabs={valueTabs}
              setValueTabs={setValueTabs}
              followers={profileInfo.followers}
              following={profileInfo.following}
              profile={userName}
            />
          </Stack>
        </Stack>

        {profileInfo.top_three ? (
          <Bookshelf
            key={"top_three"}
            id={"top_three"}
            title={profileInfo.top_three.name}
            books={profileInfo.top_three.books}
            user={profileInfo._id}
          />
        ) : null}
        {profileInfo.shelf && profileInfo.shelf.length > 0
          ? profileInfo.shelf.map((shelf) => (
              <Link key={shelf._id} to={`/${userName}/${shelf._id}`}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "black",
                    borderRadius: 1,
                    color: "black",
                    justifyContent: "start",
                    fontWeight: "600",
                    width: "320px",
                  }}
                >
                  {shelf.name ? shelf.name : "Nameless shelf"}
                </Button>
              </Link>
            ))
          : null}

        <CreateShelfButton />
      </Stack>
    </>
  );
}
export default Profilepage;
