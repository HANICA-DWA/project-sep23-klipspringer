import { Stack } from "@mui/material";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bookshelf from "../components/Bookshelf";
import CreateShelfButton from "../components/CreateShelfButton";
import { LoggedInContext } from "../Contexts";
import { useAlert } from "../hooks/useAlert";
import getProfileData from "../data/getProfileData";

export default function ShelfPage({ setLoggedIn }) {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState([]);
  const [shelfInfo, setShelfInfo] = useState({});
  const { loggedIn, username } = useContext(LoggedInContext);
  const { userName, shelf } = useParams();
  const [errMessage, setErrMessage] = useState("");
  const [setDeleteShelfAlertOn, deleteShelfAlert] = useAlert(errMessage ? errMessage : "Shelf deleted!", 3000, errMessage ? "error" : "success");
  useEffect(() => {
    const getFunction = async () => {
      const profileData = await getProfileData(userName, ["_id", "profile_picture", "shelf"]);
      setProfileInfo(profileData);
      setShelfInfo(profileData.shelf.find((shelfFromUser) => shelfFromUser._id === shelf));
    };
    getFunction();
  }, []);

  async function deleteShelf(shelfID) {
    try {
      await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${username}/shelves/${shelfID}`, {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
      });
      setShelfInfo({});
      setErrMessage("");
      navigate(`/${userName}`);
    } catch (err) {
      setErrMessage(err.message);
    }
    setDeleteShelfAlertOn();
  }
  return (
    <Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
      {deleteShelfAlert}
      <Header setLoggedIn={setLoggedIn} shareButton />
      <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />
      {shelfInfo && Object.keys(shelfInfo).length > 0 ? (
        <Bookshelf
          onDelete={deleteShelf}
          key={shelfInfo._id}
          id={shelfInfo._id}
          title={shelfInfo.name}
          books={shelfInfo.books}
          user={profileInfo._id}
          nrOfColums={4}
        />
      ) : null}
      <CreateShelfButton />
    </Stack>
  );
}
