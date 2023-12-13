import { FormControl, InputAdornment, IconButton, TextField, Popper, Paper, Button, Typography, LinearProgress, Chip } from "@mui/material";
import SearchResult from "./SearchResult";
import { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import SearchResultPerson from "./SearchResultPerson";

export default function SearchBar({ onClick, fullSearch, genreChips, deleteChip, setChips }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [lastSearched, setLastSearched] = useState("");

  function popperContents() {
    if (isLoading) {
      return <LinearProgress sx={{ width: "100%" }} />;
    } else if (searchResults && searchResults.length >= 1 && searchText.startsWith("@") && fullSearch && !isLoading) {
      return searchResults.map((person) => {
        return <SearchResultPerson closePopper={closepopper} person={person} onClick={onClick} key={person._id} />;
      });
    } else if (searchResults && searchResults.length >= 1 && !isLoading) {
      return searchResults.map((book) => {
        return <SearchResult closePopper={closepopper} book={book} onClick={onClick} key={book.key} fullSearch={fullSearch} />;
      });
    } else if (searchResults.length < 1 && !isLoading) {
      return <Typography variant="body1">No results found.</Typography>;
    }
  }

  useEffect(() => {
    if (
      (!isOnCooldown && searchText.length >= 3 && !searchText.startsWith("@")) ||
      (!isOnCooldown && searchText.length >= 2 && searchText.startsWith("@"))
    ) {
      if (lastSearched !== searchText){
        updateSearch();
        setIsOnCooldown(true);
        setTimeout(() => setIsOnCooldown(false), 1000);
      }
    }
    if ((searchText.length <= 2 && !searchText.startsWith("@")) || (searchText.length <= 1 && searchText.startsWith("@"))) {
      setSearchResults([]);
      setIsLoading(false);
      closepopper();
    }
  }, [isOnCooldown, searchText]);

  const updateSearch = () => {
    if (searchText.startsWith("@") && fullSearch) getPersonSearchResults();
    else getBookSearchResults();

    setLastSearched(searchText);
    openpopper();
  };

  async function getPersonSearchResults() {
    setIsLoading(true);
    const toSearch = searchText.slice(1);
    const result = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/user/?q=${toSearch}`);
    const data = await result.json();
    setSearchResults(data);
    setIsLoading(false);
  }

  async function getBookSearchResults() {
    let data = null
    setIsLoading(true);
    if(searchText){
      const urlTitle = searchText.replace(/([\s])/g, "+");
      const result = await fetch(`https://openlibrary.org/search.json?q=${urlTitle}&limit=10`);
      data = await result.json();
    } else if (genreChips){
      setIsLoading(true);
      const result = await fetch(`https://openlibrary.org/search.json?subject=${genreChips.join("+")}&limit=10`);
      data = await result.json();
    }
    setSearchResults(data.docs.filter((book) => book.isbn));
    setIsLoading(false);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const spanRef = useRef();
  const containerRef = useRef();

  function openpopper() {
    setAnchorEl(spanRef.current);
  }

  function closepopper() {
    console.log("sluiten")
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateSearch();
        }}
        style={{ marginBottom: "0px", width: "100%" }}
      >
        <FormControl ref={spanRef} fullWidth>
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value ? e.target.value : "")}
            placeholder={genreChips.length > 0 ? null : "Search books..."}
            InputProps={{
              readOnly: genreChips.length > 0 ? true : false,
              startAdornment: (
                <>
                <InputAdornment position="start">
                  <IconButton type="submit" edge="end">
                    <Search />
                  </IconButton>
                </InputAdornment>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                  {genreChips.map((g) => {
                    return <Chip sx={{margin: "5px 5px 5px 0px"}} key={g} label={g} onDelete={() => deleteChip(g) }/> 
                  })}
                </div>
                </>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={() => {
                      closepopper();
                      setSearchText("");
                      setChips([])
                    }}
                  >
                    cancel
                  </Button>
                </InputAdornment>
              ),
              sx: {
                borderRadius: "8px",
                outline: "0px",
                "& fieldset": { border: "none" },
                backgroundColor: "rgba(0, 0, 0, 0.082)",
              },
            }}
          />
        </FormControl>
      </form>
      <div ref={containerRef} style={{ zIndex: 1, width: "auto" }}>
        <Popper sx={{ maxWidth: "600px", width: "100%" }} id={id} open={open} anchorEl={anchorEl} container={containerRef.current}>
          <Paper elevation={2} sx={{ padding: "4px 4px 4px 4px" }}>
            {popperContents()}
          </Paper>
        </Popper>
      </div>
    </>
  );
}
