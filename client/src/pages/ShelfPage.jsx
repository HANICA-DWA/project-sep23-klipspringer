import { Stack, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Bookshelf from "../components/Bookshelf";
import { useState } from "react";


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
                <Stack
                    direction="column"
                    alignItems="center"
                >
                    <Typography variant="h4">A shelf contains at least 3 books!</Typography>
                    <SearchBar />
                </Stack>

                <Bookshelf books={books} showAdding={false} />



            </Stack>


        </>
    )
}