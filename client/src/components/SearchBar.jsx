import {
  FormControl,
  InputAdornment,
  IconButton,
  TextField,
  Paper,
} from "@mui/material";
import SearchResult from "./SearchResult";
import { useState } from "react";
import { Search } from "@mui/icons-material";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const results = [1, 2, 3];
  return (
    <Paper elevation={2} sx={{ padding: "4px 4px 4px 4px" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Searching...");
        }}
      >
        <FormControl fullWidth>
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
                <InputAdornment position="end">cancel</InputAdornment>
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
      {results.map((e) => {
        return <SearchResult key={e} />;
      })}
    </Paper>
  );
}
