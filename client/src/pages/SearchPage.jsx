import { Container, Stack, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Suggestions from "../components/Suggestions";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../Contexts.jsx";
import { ArrowBackIos, Add } from "@mui/icons-material";
import ModalBookcase from "../components/ModalBookcase.jsx";
import { useAlert } from "../hooks/useAlert.jsx";
import getProfileData from "../data/getProfileData.js";
import { getWebSocket } from "../data/websockets.js";

export default function SearchPage() {
  const navigate = useNavigate();

  const shelf = useParams().shelf;
  const { username } = useContext(LoggedInContext);

  const [errMessage, setErrMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [showAlert, alertComponent] = useAlert(errMessage ? errMessage : "Succesfully added", 3000, errMessage ? "warning" : "success");
  const [booksOnShelf, setBooksOnShelf] = useState([]);
  const [topThreeLength, setTopThreeLength] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = (book) => {
    fetch(import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "/shelves/" + shelf, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({ book: book }),
    })
      .then((res) => {
        if (res.ok) {
          showAlert();
          getWebSocket().send(JSON.stringify({ type: "new_book", link: shelf === "top_three" ? `/${username}` : `/${username}/${shelf}` }));
          navigate(-1);
        } else {
          res
            .json()
            .then((message) => setErrMessage(message.error))
            .then(() => showAlert());
        }
        console.log("succes", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    const getFunction = async () => {
      const profileData = await getProfileData(username, ["top_three", "shelf"]);
      let currentShelf;
      if (shelf === "top_three") {
        currentShelf = profileData.top_three;
        setTopThreeLength(currentShelf.books.length);
      } else {
        currentShelf = profileData.shelf.find((item) => item._id == shelf);
      }
      setBooksOnShelf(currentShelf.books);
    };
    getFunction();
  }, [shelf, username]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: "20px",
      }}
    >
      {alertComponent}
      <Stack direction="column" alignItems="center">
        <Stack direction="column" alignItems="center" width="100%">
          <Stack direction="row" alignItems="center" width="100%" sx={{ marginBottom: "5px" }}>
            <ArrowBackIos onClick={() => navigate(-1)} />
            <SearchBar onClick={handleAdd} />
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ margin: "5px", marginBottom: "20px" }} onClick={handleOpen}>
            <Add />
            <Typography>Choose from bookcase</Typography>
          </Stack>
        </Stack>

        <ModalBookcase
          open={open}
          handleClose={handleClose}
          handleAdd={handleAdd}
          booksOnShelf={booksOnShelf}
          topThreeLength={topThreeLength}
          setTopThreeLength={setTopThreeLength}
        />
        <Suggestions />
      </Stack>
    </Container>
  );
}
