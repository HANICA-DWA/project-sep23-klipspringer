import { Typography, Button, Avatar, Stack } from "@mui/material";
import Bookshelf from "../components/Bookshelf";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoggedInContext } from "../Contexts";
import Header from "../components/Header";

function Profilepage({ setLoggedIn }) {
  const navigate = useNavigate();
  const userName = useParams().userName;
  const { loggedIn, username } = useContext(LoggedInContext);
  const [profileInfo, setProfileInfo] = useState([]);
  const [deleteShelfID, setDeleteShelfID] = useState(null)

  const shelfClickHandler = loggedIn ? () => navigate("/profile/" + username + "/shelf") : () => navigate("/login");

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
  }


  return (
    <>
      <Stack justifyContent="flex-start" sx={{ minHeight: "100vh" }} spacing={3} useFlexGap>
        <Header setLoggedIn={setLoggedIn} />
        <Stack direction="column" alignItems="center">
          <div
            style={{
              marginTop: "40px",
              marginBottom: "20px",
              padding: "3px",
              border: "1px solid grey",
              borderRadius: "50px",
            }}
          >
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt={profileInfo.name}
              src={profileInfo.profile_picture}
              imgProps={{ referrerPolicy: "no-referrer" }}
            />
          </div>
          <Typography variant="h6" fontWeight="700" sx={{ overflowWrap: "anywhere", maxWidth: "100%", textAlign: "center" }}>
            {profileInfo.name}
          </Typography>
        </Stack>

        {profileInfo.top_three ? (
          <Bookshelf key={"top_three"} id={"top_three"} title="My top 3 books" books={profileInfo.top_three} user={profileInfo._id} />
        ) : null}
        {profileInfo.shelf != undefined && profileInfo.shelf.length > 0
          ? profileInfo.shelf.map((shelf) => (
              <Bookshelf onDelete={deleteShelf} key={shelf._id} id={shelf._id} title={shelf.name} books={shelf.books} user={profileInfo._id} />
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
