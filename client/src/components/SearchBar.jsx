import { FormControl, InputAdornment, IconButton, TextField, Popper, Box, Paper, Button, Typography, LinearProgress} from "@mui/material";
import SearchResult from "./SearchResult";
import { useRef, useState } from "react";
import { Search } from "@mui/icons-material";

export default function SearchBar( { onAdd }) {
  const [searchText, setSearchText] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  function popperContents(){
    if(isLoading){
      return <LinearProgress sx={{width: "400px"}}/>
    } else if(searchResults && searchResults.length >= 1 && !isLoading) {
      return searchResults.map((book) => {return <SearchResult book={book} onAdd={onAdd} key={book.key} />;}) 
    } else if(searchResults.length < 1 && !isLoading){
      return <Typography variant="body1">No results found.</Typography>
    }
  }

  async function getBookSearchResults() {
    setIsLoading(true)
    const urlTitle = searchText.replace(/([\s])/g, "+");
    const result = await fetch(`https://openlibrary.org/search.json?q=${urlTitle}&limit=10`);
    const data = await result.json();
    setSearchResults(data.docs);
    setIsLoading(false)
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const spanRef = useRef();
  function openpopper() {
    setAnchorEl(spanRef.current);
  }
  function closepopper() {
    setAnchorEl(null);
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
        style={{ marginBottom: "25px" }}
      >
        <FormControl ref={spanRef} fullWidth>
          <TextField
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
