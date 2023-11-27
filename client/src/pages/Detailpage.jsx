import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Add, ArrowBackIosNew, ArrowOutward, ImageNotSupported } from "@mui/icons-material";
import { Box, Chip, Stack, Typography, Modal } from "@mui/material";
import { useEffect, useState } from "react";

export default function Detailpage({ setLoggedIn }) {
    const navigate = useNavigate();
    const isbn = useParams().isbn;
    const [book, setBook] = useState({});
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const styleDialog = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        //transform: 'translate(0, 0)',
        width: "100vw",
        bgcolor: 'white',
        //border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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
                        {book.subtitle != undefined ? <Typography gutterBottom>{book.subtitle}</Typography> : null}
                        {book.authors != undefined ? book.authors.map((author) => {
                            const name = author.name.split(" ")
                            { return <Typography key={name[1]} variant="h6" color="#6A9D8A">{name[1] + ", " + name[0]}</Typography> }
                        }) : <Typography variant="h6" color="#6A9D8A">No authors found</Typography>}
                    </Stack>
                </Box>
                <Chip onClick={handleOpen} sx={{ margin: "10px", fontSize: "14px" }} color="secondary" icon={<Add style={{ transform: "scale(0.7)" }} />} label="Add to shelf" />

                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={styleDialog}>
                        <Typography>
                            My shelfs
                        </Typography>
                        <Typography>
                            Naam van shelf
                        </Typography>
                    </Box>
                </Modal>

                <Chip sx={{ margin: "10px", fontSize: "14px" }} color="primary" icon={<ArrowOutward style={{ transform: "scale(0.7)" }} />} label="Buy" />
            </Stack>
        </>
    )
}