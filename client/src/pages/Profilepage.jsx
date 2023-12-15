import { Button, Stack, Typography } from "@mui/material";
import Bookshelf from "../components/Bookshelf";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import CreateShelfButton from "../components/CreateShelfButton";
import getProfileData from "../data/getProfileData";
import ModalFollowers from "../components/ModalFollowers";
import { getWebSocket } from "../data/websockets";
import { useDispatch, useSelector } from "react-redux";
import { followAccount, unFollowAccount } from "../redux/reducers/profileReducer";

function Profilepage({ setLoggedIn }) {
  const userName = useParams().userName;
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileInfo, setProfileInfo] = useState({});
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
    if (profile._id == userName) {
      setProfileInfo(profile);
    } else {
      getFunction();
    }
  }, [profile, userName]);

  function handleFollow() {
    if (profileInfo.followers.find((name) => name._id === profile._id)) {
      dispatch(unFollowAccount({ accountToUnFollow: userName }));
      getWebSocket().send(JSON.stringify({ type: "notification_unfollow", following: userName, link: `/${profile._id}` }));
    } else {
      dispatch(followAccount({ accountToFollow: userName }));
      getWebSocket().send(JSON.stringify({ type: "notification_follow", following: userName, link: `/${profile._id}` }));
    }
  }

  return (
    <>
      <Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
        <Header setLoggedIn={setLoggedIn} shareButton={true} profileInfo={profileInfo} />
        <Stack direction="row" justifyContent="space-evenly" width="100%" maxWidth="800px">
          <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />
          <Stack justifyContent="center">
            <Stack direction="row" sx={{ cursor: "pointer" }}>
              <Stack alignItems="center" margin="5px" onClick={() => handleOpen("followers")}>
                <Typography variant="body1" fontWeight={700}>
                  Followers
                </Typography>
                <Typography>{profileInfo.followers ? profileInfo.followers.length : null}</Typography>
              </Stack>
              <Stack alignItems="center" margin="5px" onClick={() => handleOpen("following")}>
                <Typography variant="body1" fontWeight={700}>
                  Following
                </Typography>
                <Typography>{profileInfo.following ? profileInfo.following.length : null}</Typography>
              </Stack>
            </Stack>
            {profile._id !== userName && profile.loggedIn ? (
              <Button variant="contained" onClick={handleFollow}>
                {profileInfo.followers ? (profileInfo.followers.find((name) => name._id === profile._id) ? "Unfollow" : "Follow") : null}
              </Button>
            ) : !profile.loggedIn ? (
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
