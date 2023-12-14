import { ArrowBackIos } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Suggestions from "../components/Suggestions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Genres from "../components/Genres";
import {HamburgerMenu} from "../components/HamburgerMenu.jsx";

export default function Search({ setLoggedIn }) {

    const navigate = useNavigate()

    const [errMessage, setErrMessage] = useState("");
    const [selectedGenreChips, setSelectedGenreChips] = useState([]);

    const handleClick = (searched) => {
        if (!searched.type)
            navigate(`/book/${searched._id}`)
        if (searched.type === "book")
            navigate(`/book/${searched.book._id}`)
        if (searched.type === "person")
            navigate(`/${searched.person._id}`)
    }

    function deleteGenreChip(a){
      const newChipsArray = selectedGenreChips.filter((e) => {
        return e !== a
      })
      setSelectedGenreChips(newChipsArray)
    }

    return (
        <Container
          maxWidth="sm"
          sx={{
            paddingTop: "20px",
          }}
        >
          <Stack direction="row" alignItems="center" style={{ marginBottom: "25px" }}>
            <ArrowBackIos onClick={() => navigate(-1)} />
            <SearchBar fullSearch onClick={handleClick} genreChips={selectedGenreChips} setChips={setSelectedGenreChips} deleteChip={deleteGenreChip}/>
              {// <HamburgerMenu setLoggedIn={setLoggedIn}/> Waiting for design
              }
          </Stack>
          <Typography align="center" variant="body1" style={{ color: "red" }}>
            {errMessage}
          </Typography>
          <Genres setChips={setSelectedGenreChips} selectedChips={selectedGenreChips}/>
          <Suggestions />
        </Container>
      );
}