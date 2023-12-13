import { Button, Stack, Typography, Box } from "@mui/material";
import Bookshelf from "../components/Bookshelf";
import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LoggedInContext } from "../Contexts";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import CreateShelfButton from "../components/CreateShelfButton";
import ModalFollowers from "../components/ModalFollowers";

function Profilepage({ setLoggedIn }) {
  const userName = useParams().userName;
  const navigate = useNavigate();
  const { loggedIn, username } = useContext(LoggedInContext);
  const [profileInfo, setProfileInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [valueTabs, setValueTabs] = useState("")

  const handleOpen = (tab) => {
    setOpen(true);
    setValueTabs(tab)
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getProfileData();
  }, [userName]);

  function getProfileData() {
    fetch(
      import.meta.env.VITE_BACKEND_HOST +
      "/user/" +
      userName +
      "?" +
      new URLSearchParams({
        fields: ["_id", "profile_picture", "name", "top_three", "shelf", "followers", "following"],
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
  }

  function handleFollow() {
    if (profileInfo.followers.find((name) => name === username)) {
      fetch(
        import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "/unfollow", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ account: userName }),
      }).then((res) => {
        return res.json();
      }).then((res) => {
        setProfileInfo(res)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      fetch(
        import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "/follow", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ account: userName }),
      }).then((res) => {
        return res.json();
      }).then((res) => {
        setProfileInfo(res)
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <>
      <Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
        <Header setLoggedIn={setLoggedIn} shareButton={true} />
        <Stack direction="row" justifyContent="space-evenly" width="100vw">
          <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />
          <Stack justifyContent="center">
            <Stack direction="row">
              <Stack alignItems="center" margin="5px" onClick={() => handleOpen("followers")}>
                <Typography variant="caption">Followers</Typography>
                <Typography >{profileInfo.followers ? profileInfo.followers.length : null}</Typography>
              </Stack>
              <Stack alignItems="center" margin="5px" onClick={() => handleOpen("following")}>
                <Typography variant="caption" >Following</Typography>
                <Typography >{profileInfo.following ? profileInfo.following.length : null}</Typography>
              </Stack>
            </Stack>
            {username !== userName && loggedIn ?
              <Button variant="contained" onClick={handleFollow}>
                {profileInfo.followers ? (profileInfo.followers.find((name) => name === username) ? "Unfollow" : "Follow") : null}
              </Button>
              : !loggedIn ?
              <Button variant="contained" onClick={() => navigate("/login")}>
                Follow
              </Button>
              : null
            }
            <ModalFollowers 
              open={open} handleClose={handleClose} 
              valueTabs={valueTabs} setValueTabs={setValueTabs} 
              followers={profileInfo.followers} following={profileInfo.following}
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
