import { ArrowBackIos } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Suggestions from "../components/Suggestions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Genres from "../components/Genres";

export default function Search() {
    const navigate = useNavigate()
    const [errMessage, setErrMessage] = useState("");
    const [selectedGenreChips, setSelectedGenreChips] = useState([]);

    const [activeSearchFilterPage, setActiveSearchFilterPage] = useState("")

    const handleClick = (searched) => {
      switch (searched.type) {
        case "book":
          navigate(`/book/${searched.book._id}`)
          break;
        case "person":
          navigate(`/${searched.person._id}`)
          break;
        case "author":
          navigate(`/author/${searched.author._id}`)
          break;
        default:
          navigate(`/book/${searched._id}`)
          break;
      }
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
            <SearchBar 
            fullSearch 
            onClick={handleClick} 
            genreChips={selectedGenreChips} 
            setChips={setSelectedGenreChips} 
            deleteChip={deleteGenreChip}
            setActiveSearchFilterPage={setActiveSearchFilterPage}
            />
          </Stack>
          <Typography align="center" variant="body1" style={{ color: "red" }}>
            {errMessage}
          </Typography>
          {activeSearchFilterPage == "Books" ? <Genres setChips={setSelectedGenreChips} selectedChips={selectedGenreChips}/> : null }
          <Suggestions />
        </Container>
      );
}