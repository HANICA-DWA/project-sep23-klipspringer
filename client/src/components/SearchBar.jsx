import { FormControl, InputAdornment, IconButton, TextField, Popper, Box, Paper, Button, Typography, LinearProgress } from "@mui/material";
import SearchResult from "./SearchResult";
import { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import SearchResultPerson from "./SearchResultPerson";

export default function SearchBar({ onClick, fullSearch }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [lastSearched, setLastSearched] = useState("");

  function popperContents() {
    if (isLoading) {
      return <LinearProgress sx={{ width: "400px" }} />;
    } else if (searchResults && searchResults.length >= 1 && searchText.startsWith("@") && fullSearch && !isLoading) {
      return searchResults.map((person) => {
        return <SearchResultPerson closePopper={closepopper} person={person} onClick={onClick} key={person._id} />
      });
    } else if (searchResults && searchResults.length >= 1 && !isLoading) {
      return searchResults.map((book) => {
        return <SearchResult closePopper={closepopper} book={book} onAdd={onClick} key={book.key} fullSearch={fullSearch}/>;
      });
    } else if (searchResults.length < 1 && !isLoading) {
      return <Typography variant="body1">No results found.</Typography>;
    }
  }

  useEffect(() => {
    if (!isOnCooldown && searchText.length >= 3) {
      if (lastSearched !== searchText) {
        updateSearch()
        setIsOnCooldown(true);
        setTimeout(() => setIsOnCooldown(false), 1000)
      }
    }
  }, [isOnCooldown, searchText])

  const updateSearch = () => {
    if (searchText.startsWith('@') && fullSearch)
      getPersonSearchResults()
    else
      getBookSearchResults()

    setLastSearched(searchText)
    openpopper()
  }

  async function getPersonSearchResults() {
    setIsLoading(true);
    const toSearch = searchText.slice(1);
    const result = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/user/?q=${toSearch}`);
    const data = await result.json();
    await new Promise(resolve => setTimeout(resolve(), 500))
    setSearchResults(data);
    setIsLoading(false);
  }
  
  async function getBookSearchResults() {
    setIsLoading(true);
    const urlTitle = searchText.replace(/([\s])/g, "+");
    const result = await fetch(`https://openlibrary.org/search.json?q=${urlTitle}&limit=10`);
    const data = await result.json();
    setSearchResults(data.docs.filter((book) => book.isbn));
    setIsLoading(false);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const spanRef = useRef();

  function openpopper() {
    setAnchorEl(spanRef.current);
  }

  function closepopper() {
    setAnchorEl(null);
    setSearchText("");
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getBookSearchResults();
          openpopper();
        }}
        style={{ marginBottom: "0px", width: "100%" }}
      >
        <FormControl ref={spanRef} fullWidth>
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search books..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton type="submit" edge="end">
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={() => closepopper()}>cancel</Button>
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
      <Popper sx={{ maxWidth: "600px" }} id={id} open={open} anchorEl={anchorEl}>
        <Paper elevation={2} sx={{ padding: "4px 4px 4px 4px" }}>
          {popperContents()}
        </Paper>
      </Popper>
    </>
  );
}
