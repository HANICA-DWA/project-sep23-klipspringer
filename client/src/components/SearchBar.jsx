import { FormControl, InputAdornment, IconButton, TextField, Popper, Paper, Button, Typography, LinearProgress, Chip, Divider, Stack } from "@mui/material";
import SearchResult from "./SearchResult";
import { useEffect, useRef, useState } from "react";
import { Cancel, QrCodeScanner, Search } from "@mui/icons-material";
import SearchResultPerson from "./SearchResultPerson";
import Barcode from "../pages/Barcode";
import { useAlert } from "../hooks/useAlert";

export default function SearchBar({ onClick, fullSearch, genreChips, deleteChip, setChips, booksOnShelf, topThreeLength, setTopThreeLength, setActiveSearchFilterPage }) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [lastSearched, setLastSearched] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [books, setBooks] = useState([]);
  const [errMessage, setErrMessage] = useState("")
  const [showAlert, alertComponent] = useAlert(errMessage, 3000, "warning");

  function addBooks(book) {
    if (books.length == 0) {
        setErrMessage("You need to pick min 1 book");
        showAlert();
    } else {
        onClick(book);
        setBooks([]);
        closepopper();
    }
}
  
  const [bookResults, setBookResults] = useState([])
  const [personResults, setPersonResults] = useState([])
  const [authorResults, setAuthorResults]= useState([])
  
  const searchFilters = ["All", "Books", "Authors", "Profiles"]
  const [activeSearchFilter, setActiveSearchFilter] = useState(fullSearch ? searchFilters[0] : searchFilters[1])

  function popperContents() {
    if (isLoading && searchText.length >= 1) {
      return <LinearProgress sx={{ width: "100%" }} />;
    } else if (!isLoading && ((searchResults.length < 1 && activeSearchFilter !== searchFilters[0]) || (activeSearchFilter === searchFilters[0] && bookResults.length < 1 && personResults.length < 1 && authorResults.length < 1))) {
      return <Typography variant="body1">No results found.</Typography>;
    } else {
      switch (activeSearchFilter) {
        case searchFilters[0]:
          const booksRes = bookResults.map((b) => {
            return <SearchResult closePopper={closepopper} book={b} onClick={onClick} fullSearch={fullSearch} key={b.key} />;
          });
          const author = authorResults.map((a) => {
            const person = { _id: a.name, profile_picture: `https://covers.openlibrary.org/a/olid/${a.key}-M.jpg?default=false`, key: a.key };
            return <SearchResultPerson author closePopper={closepopper} person={person} onClick={onClick} key={person.key} />;
          });
          const person = personResults.map((p) => {
            return <SearchResultPerson closePopper={closepopper} person={p} onClick={onClick} key={p._id} />;
          });
          return booksRes.concat(author, person);
        case searchFilters[1]:
          return (
            <>
              {!fullSearch ? (
                <Stack alignItems="center" sx={{ paddingTop: "3px" }}>
                  <Button onClick={() => addBooks(books)} variant="contained" sx={{ width: "100%" }}>
                    Add to shelf
                  </Button>
                </Stack>
              ) : null}
              {searchResults.map((book) => {
                return (
                  <SearchResult
                    closePopper={closepopper}
                    book={book}
                    onClick={onClick}
                    key={book.key}
                    fullSearch={fullSearch}
                    booksOnShelf={booksOnShelf}
                    topThreeLength={topThreeLength}
                    setTopThreeLength={setTopThreeLength}
                    books={books}
                    setBooks={setBooks}
                    setErrMessage={(error) => {setErrMessage(error); showAlert();}}
                    showAlert={showAlert}
                  />
                );
              })}
            </>
          );
        case searchFilters[2]:
          return searchResults.map((author) => {
            const person = {
              _id: author.name,
              profile_picture: `https://covers.openlibrary.org/a/olid/${author.key}-M.jpg?default=false`,
              key: author.key,
            };
            return <SearchResultPerson author closePopper={closepopper} person={person} onClick={onClick} key={person.key} />;
          });
        case searchFilters[3]:
          return searchResults.map((person) => {
            return <SearchResultPerson closePopper={closepopper} person={person} onClick={onClick} key={person._id} />;
          });
        default:
          break;
      }
    }
  }

  useEffect(() => {
    if (
      (!isOnCooldown && searchText.length >= 3 && activeSearchFilter != searchFilters[3]) ||
      (!isOnCooldown && searchText.length >= 2 && activeSearchFilter == searchFilters[3])
    ) {
      if (lastSearched !== searchText) {
        updateSearch();
        setIsOnCooldown(true);
        setTimeout(() => setIsOnCooldown(false), 1000);
      }
    }
    if ((searchText.length <= 2 && activeSearchFilter !== searchFilters[3]) || (searchText.length <= 1 && activeSearchFilter === searchFilters[3])) {
      setSearchResults([]);
      setIsLoading(false);
      closepopper();
    }
  }, [isOnCooldown, searchText]);

  const updateSearch = () => {
    clearSearch()
    switch (activeSearchFilter) {
      case searchFilters[0]:
        getAllSearchResults()
        break;
      case searchFilters[1]:
        getBookSearchResults()
        break;
      case searchFilters[2]:
        getAuthorSearchResults()
        break;
      case searchFilters[3]:
        getPersonSearchResults()
        break;
      default:
        break;
    }
    setLastSearched(searchText);
    openpopper();
  };

  async function getPersonSearchResults(all) {
    setIsLoading(true)
    const result = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/user/?q=${searchText}`);
    const data = await result.json();
    if (all){
      setPersonResults(data)
    } else {
      setSearchResults(data);
    }
    setIsLoading(false)
  }

  async function getBookSearchResults(all) {
    setIsLoading(true)
    let data = null
    if(searchText){
      const urlTitle = searchText.replace(/([\s])/g, "+");
      const result = await fetch(`https://openlibrary.org/search.json?q=${urlTitle}&limit=10`);
      data = await result.json();
    } else if (genreChips){
      const result = await fetch(`https://openlibrary.org/search.json?subject=${genreChips.join("+")}&limit=10`);
      data = await result.json();
    }
    if (all){
      setBookResults(data.docs.filter((book) => book.isbn))
    } else {
      setSearchResults(data.docs.filter((book) => book.isbn));
    }
    setIsLoading(false)
  }

  async function getAuthorSearchResults(all){
    setIsLoading(true)
    const urlAuthor = searchText.replace(/([\s])/g, "+");
    const result = await fetch(`https://openlibrary.org/search/authors.json?q=${urlAuthor}&limit=10`);
    const data = await result.json();
    if (all){
      setAuthorResults(data.docs)
    } else {
      setSearchResults(data.docs);
    }
    setIsLoading(false)
  }

  function getAllSearchResults(){
    getBookSearchResults(true)
    getPersonSearchResults(true)
    getAuthorSearchResults(true)
  }

  function clearSearch(){
    setSearchResults([])
    setBookResults([])
    setPersonResults([])
    setAuthorResults([])
  }

  // code for the popper component
  const [anchorEl, setAnchorEl] = useState(null);
  const spanRef = useRef();
  const containerRef = useRef();

  function openpopper() {
    setAnchorEl(spanRef.current);
  }

  function closepopper() {
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  // end

  if (isScanning)
    return <Barcode onAdd={onClick} closeScanner={() => setIsScanning(false)} setIsScanning={setIsScanning} />

  return (
    <>
    {alertComponent}
      <Stack style={{width: "100%" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateSearch();
          }}
          style={{ marginBottom: "10px", width: "100%" }}
        >
          <FormControl ref={spanRef} fullWidth>
            <TextField
              value={searchText}
              onChange={(e) => setSearchText(e.target.value ? e.target.value : "")}
              placeholder={genreChips && genreChips.length > 0 ? null : "Search books..."}
              InputProps={{
                readOnly: genreChips && genreChips.length > 0 ? true : false,
                startAdornment: (
                  <>
                  <InputAdornment position="start">
                    <IconButton type="submit" edge="end">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                  <div style={{display: "flex", flexWrap: "wrap"}}>
                    {genreChips && genreChips.map((g) => {
                      return <Chip size="small" sx={{margin: "5px 5px 5px 0px"}} key={g} label={g} onDelete={() => deleteChip(g) }/> 
                    })}
                  </div>
                  </>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Cancel
                      
                      onClick={() => {
                        closepopper();
                        setSearchText("")
                        clearSearch();
                        if(genreChips)setChips([])
                      }}
                      sx={{cursor: "pointer", borderRight: "1px solid", padding: "0.25rem 0.5rem"}}
                    />
                    <QrCodeScanner 
                      onClick={()=> {
                        setIsScanning(true);
                      }}
                      sx={{cursor: "pointer", padding: "0.25rem 0rem 0.25rem 0.7rem"}}
                    />
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
        {fullSearch ?
          <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 1 }}>
            {
              searchFilters.map((e) => {
                return <Chip 
                          label={e} 
                          key={e} 
                          color="primary" 
                          onClick={() => {
                            setActiveSearchFilter(e) 
                            setActiveSearchFilterPage(e)
                          }} 
                          variant={activeSearchFilter == e ? "filled" : "outlined"}
                        />
              })
            }
          </Stack>
        :
          null
        }
      </Stack>
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
