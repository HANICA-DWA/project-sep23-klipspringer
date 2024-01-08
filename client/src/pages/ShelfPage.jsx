import { Stack } from "@mui/material";
import Header from "../components/Header";
import ProfileInfo from "../components/ProfileInfo";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bookshelf from "../components/Bookshelf";
import CreateShelfButton from "../components/CreateShelfButton";
import { useAlert } from "../hooks/useAlert";
import getProfileData from "../data/getProfileData";
import { useDispatch, useSelector } from "react-redux";
import { deleteShelf } from "../redux/reducers/profileReducer";

export default function ShelfPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [profileInfo, setProfileInfo] = useState([]);
  const [shelfInfo, setShelfInfo] = useState({});
  const { userName, shelf } = useParams();
  const [errMessage, setErrMessage] = useState("");
  const [setDeleteShelfAlertOn, deleteShelfAlert] = useAlert(errMessage ? errMessage : "Shelf deleted!", 3000, errMessage ? "error" : "success");

  useEffect(() => {
    const getFunction = async () => {
      const profileData = await getProfileData(userName, ["_id", "profile_picture", "shelf"]);
      setProfileInfo(profileData);
      setShelfInfo(profileData.shelf.find((shelfFromUser) => shelfFromUser._id === shelf));
    };
    if (profile._id == userName) {
      setProfileInfo(profile);
      setShelfInfo(profile.shelf.find((shelfFromUser) => shelfFromUser._id === shelf));
    } else {
      getFunction();
    }
  }, [profile, userName]);

  async function deleteHandler(shelfID) {
    const cb = (error) => {
      setErrMessage(error);
      if (!error) {
        setShelfInfo({});
        navigate(`/${userName}`);
      }
      setDeleteShelfAlertOn();
    };
    dispatch(deleteShelf({ shelf: shelfID, cb }));
  }
  return (
    <Stack justifyContent="flex-start" alignItems="center" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
      {deleteShelfAlert}
      <Header shareButton profileInfo={profileInfo} />
      <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />
      {shelfInfo && Object.keys(shelfInfo).length > 0 ? (
        <Bookshelf
          onDelete={deleteHandler}
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
