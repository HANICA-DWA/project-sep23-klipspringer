import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Bookshelf from "../components/Bookshelf";
import { useState } from "react";
import { ArrowBackIos, Title } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export default function ShelfPage() {

    const navigate = useNavigate();

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
          <Stack direction="column" alignItems="center" sx={{width: "100%"}}>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{width: "100%"}}>
                <ArrowBackIos sx={{ left: "0", width: "32px", position:"absolute"}} onClick={() => navigate(-1)}/>
                <Typography variant="h5" sx={{ my: 1 }}>
                A shelf contains at least 3 books!
                </Typography>

            </Stack>
            <SearchBar />
          </Stack>

          <Stack gap={2} direction="column" alignItems="center">
            <Bookshelf books={books} hideAdding />
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