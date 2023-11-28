import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Add, ArrowBackIosNew, ArrowOutward, ImageNotSupported } from "@mui/icons-material";
import { Box, Chip, Stack, Typography} from "@mui/material";
import { LoggedInContext } from "../Contexts";
import { useContext, useEffect, useState } from "react";
import ModalShelf from "../components/ModalShelf";

export default function Detailpage({ setLoggedIn }) {
    const { loggedIn, username } = useContext(LoggedInContext);
    const navigate = useNavigate();
    const isbn = useParams().isbn;
    const [book, setBook] = useState({});
    const [open, setOpen] = useState(false);
    const [shelfInfo, setShelfInfo] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
            .then((res) => {
                return res.json()
            }).then((res) => {
                setBook(res[`ISBN:${isbn}`])
            }).catch((err) => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        fetch(
            import.meta.env.VITE_BACKEND_HOST +
            "/user/" +
            username +
            "?" +
            new URLSearchParams({
                fields: ["top_three", "shelf"],
            }),
            {
                method: "GET",
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setShelfInfo(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <ArrowBackIosNew sx={{ margin: "20px" }} onClick={() => navigate(-1)} />
                <Header setLoggedIn={setLoggedIn} />
            </Stack>
            <Stack alignItems="center">
                {book.cover !== undefined ? (
                    <img src={book.cover.medium} alt={book.title} style={{ margin: "10px", border: "1px solid #C3C0BB" }} height="280px" />
                ) : (
                    <Box sx={{ margin: "10px", height: "280px" }}>
                        <Stack justifyContent="center" sx={{ height: "100%" }}>
                            <ImageNotSupported sx={{ fontSize: 100 }} />
                            <Typography variant="body1">No image found</Typography>
                        </Stack>
                    </Box>
                )}
                <Box sx={{ margin: "10px" }}>
                    <Stack alignItems="center">
                        <Typography align="center" variant="h2" fontWeight="700" gutterBottom>
                            {book.title}
                        </Typography>
                        {book.subtitle != undefined ? <Typography align="center" gutterBottom>{book.subtitle}</Typography> : null}
                        {book.authors != undefined ? book.authors.map((author) => {
                            const name = author.name.split(" ")
                            { return <Typography key={name[1]} variant="h6" color="#6A9D8A">{name[1] + ", " + name[0]}</Typography> }
                        }) : <Typography variant="h6" color="#6A9D8A">No authors found</Typography>}
                    </Stack>
                </Box>
                <Chip onClick={handleOpen} sx={{ margin: "10px", fontSize: "14px", bgcolor: "#000000", color: "#FFFFFF"}} icon={<Add style={{ transform: "scale(0.7)", color: "#FFFFFF" }} />} label="Add to shelf" />
                    
                <ModalShelf shelfInfo={shelfInfo} open={open} handleClose={handleClose} book={{_id: isbn, cover_image: book.cover != undefined ? book.cover.medium : null}}/>

                <Chip sx={{ margin: "10px", fontSize: "14px" }} color="primary" icon={<ArrowOutward style={{ transform: "scale(0.7)" }} />} label="Buy" />
            </Stack>
        </>
    )
}