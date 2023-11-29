import { Typography, Button, Avatar, Stack } from "@mui/material";
import Bookshelf from "../components/Bookshelf";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LoggedInContext } from "../Contexts";
import Header from "../components/Header";
import { useAlert } from "../hooks/useAlert";
import ProfileInfo from "../components/ProfileInfo";

function Profilepage({ setLoggedIn, edit = false }) {
  const navigate = useNavigate();
  const userName = useParams().userName;
  const { loggedIn, username } = useContext(LoggedInContext);
  const [profileInfo, setProfileInfo] = useState([]);
  const [deleteShelfID, setDeleteShelfID] = useState(null)
  const [editMode, setEditMode] = useState(edit);

  const shelfClickHandler = loggedIn ? () => {localStorage.removeItem("book"); navigate("/" + username + "/shelf")} : () => navigate("/login");

  const [setDeleteShelfAlertOn, deleteShelfAlert] = useAlert("Shelf deleted!");

  useEffect(() => {
    getProfileData()
  }, []);

  function getProfileData(){
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
  }

  async function deleteShelf(shelfID){
    try {
      await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${username}/shelves/${shelfID}`,
        {
          method: "DELETE",
        }
      )

    } catch(err){
      console.log(err)
    }
    getProfileData()
    setDeleteShelfAlertOn()
  }


  return (
    <>
      {deleteShelfAlert}
      <Stack justifyContent="flex-start" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
        <Header setLoggedIn={setLoggedIn} shareButton={true} />
        <ProfileInfo name={profileInfo.name} avatar={profileInfo.profile_picture} handle={profileInfo._id} />
        <Button component={Link} to={`/${userName}/bookcase`} variant="contained" sx={{ width: "30vw", alignSelf: "center" }}>
          Show Bookcase
        </Button>

        {profileInfo.top_three ? (
          <Bookshelf key={"top_three"} id={"top_three"} title="My top 3 books" books={profileInfo.top_three} user={profileInfo._id} edit={editMode}/>
        ) : null}
        {profileInfo.shelf != undefined && profileInfo.shelf.length > 0
          ? profileInfo.shelf.map((shelf) => (
              <Bookshelf onDelete={deleteShelf} key={shelf._id} id={shelf._id} title={shelf.name} books={shelf.books} user={profileInfo._id} edit={editMode}/>
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
