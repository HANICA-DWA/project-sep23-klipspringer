import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Bookshelf from "../components/Bookshelf";
import { useState } from "react";
import { InputRounded, Title } from "@mui/icons-material";


export default function ShelfPage() {

    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");

    return (
      <>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          height="90vh"
        >
          <Stack direction="column" alignItems="center">
            <Typography variant="h4" sx={{ my: 1 }}>
              A shelf contains at least 3 books!
            </Typography>
            <SearchBar />
          </Stack>

          <Stack gap={2} direction="column" alignItems="center">
            <Bookshelf books={books} showAdding={false} />
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Title sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Title"
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button sx={{ ml: 1 }} variant="contained" >Create Shelf</Button>
            </Box>
          </Stack>
        </Stack>
      </>
    );
}