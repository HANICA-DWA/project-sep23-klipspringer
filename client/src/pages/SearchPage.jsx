import { Container, Stack, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Suggestions from "../components/Suggestions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowBackIos, Add } from "@mui/icons-material";
import ModalBookcase from "../components/ModalBookcase.jsx";
import { useAlert } from "../hooks/useAlert.jsx";
import { getWebSocket } from "../data/websockets.js";
import { useDispatch, useSelector } from "react-redux";
import { addBookToShelf } from "../redux/reducers/profileReducer.js";

export default function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shelf = useParams().shelf;
  const profile = useSelector((state) => state.profile);

  const [errMessage, setErrMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [showAlert, alertComponent] = useAlert(errMessage ? errMessage : "Succesfully added", 3000, errMessage ? "warning" : "success");
  const [booksOnShelf, setBooksOnShelf] = useState([]);
  const [topThreeLength, setTopThreeLength] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = (book) => {
    const cb = (error) => {
      setErrMessage(error);
      showAlert();
      if (!error) {
        getWebSocket().send(JSON.stringify({ type: "new_book", link: shelf === "top_three" ? `/${profile._id}` : `/${profile._id}/${shelf}` }));
        navigate(-1);
      }
    };
    dispatch(addBookToShelf({ shelf, book, cb }));
  };

  useEffect(() => {
    let currentShelf;
    if (shelf === "top_three") {
      currentShelf = profile.top_three;
      setTopThreeLength(currentShelf.books.length);
    } else {
      currentShelf = profile.shelf.find((item) => item._id == shelf);
    }
    setBooksOnShelf(currentShelf.books);
  }, [shelf, profile.shelf, profile.top_three]);

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
