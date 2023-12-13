import { Button, Stack } from "@mui/material";
import Bookshelf from "../components/Bookshelf";
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LoggedInContext } from "../Contexts";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import CreateShelfButton from "../components/CreateShelfButton";
import getProfileData from "../data/getProfileData";

function Profilepage({ setLoggedIn }) {
  const userName = useParams().userName;
  const { loggedIn, username } = useContext(LoggedInContext);
  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    const getFunction = async () => {
      const profileData = await getProfileData(userName, ["_id", "profile_picture", "name", "top_three", "shelf"]);
      setProfileInfo(profileData);
    };
    getFunction();
  }, [userName]);

  return (
    <>
      <Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
        <Header setLoggedIn={setLoggedIn} shareButton={true} />
        <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />

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
