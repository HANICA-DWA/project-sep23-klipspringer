import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../Contexts";
import { useContext, useState } from "react";
import { Modal, Typography, Stack, Box } from "@mui/material";
import { Add, ArrowForward, Close } from "@mui/icons-material";
import { useAlert } from "../hooks/useAlert";

export default function ModalShelf({ shelfInfo, open, handleClose, book }) {
    const { loggedIn, username } = useContext(LoggedInContext);
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState("")
    const [showAlert, alertComponent] = useAlert(errMessage, 3000, "warning")

    const styleModal = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: "100vw",
        bgcolor: 'white',
        borderRadius: '10px 10px 0px 0px',
    };

    function newShelf() {
        const data = {
            _id: book._id,
            cover_image: book.cover_image
        }
        localStorage.setItem("book", JSON.stringify(data))
        loggedIn ? navigate(`/${username}/shelf`) : navigate("/login")
    }

    function addToShelf(shelfName) {
        fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${username}/shelves/${shelfName}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ book: book }),
        }).then((res) => {
            if (res.ok) {
                navigate(`/book/${book._id}`);
            } else {
                res.json().then((message) => setErrMessage(message.error));
                showAlert()
                console.log(errMessage)
            }
            console.log("succes", res);
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
        {alertComponent}
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={styleModal}>
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{ padding: "15px", bgcolor: "#F3F3F3", borderRadius: '10px 10px 0px 0px' }}>
                <Typography fontWeight="600" color="#8D8D8D" align="center" >
                    Choose a shelf
                </Typography>
                <Close onClick={handleClose} sx={{position: "absolute", right: "10px", transform: "scale(0.8)" }}/>
                </Stack>
                {shelfInfo.top_three != undefined ?
                    <Stack direction="row" justifyContent="space-between" sx={{ padding: "10px", borderBottom: "2px solid #F3F3F3" }} onClick={() => addToShelf("top_three")}>
                        <Stack direction="row">
                            <Typography fontWeight="600" sx={{ padding: "0px 5px 0px 15px" }}>Top 3</Typography>
                            <Typography color="#8D8D8D">({shelfInfo.top_three.length})</Typography>
                        </Stack>
                        <ArrowForward sx={{ paddingRight: "15px" }} />
                    </Stack>
                    : null}
                {shelfInfo.shelf != undefined && shelfInfo.shelf.map((shelf) => shelf.name == '' ?
                    <Stack direction="row" justifyContent="space-between" sx={{ padding: "10px", borderBottom: "2px solid #F3F3F3" }} onClick={() => addToShelf(shelf._id)}>
                        <Stack direction="row">
                            <Typography fontWeight="600" key={shelf.name} sx={{ padding: "0px 5px 0px 15px" }}>Nameless shelf</Typography>
                            <Typography color="#8D8D8D">({shelf.books.length})</Typography>
                        </Stack>
                        <ArrowForward sx={{ paddingRight: "15px" }} />
                    </Stack>
                    : shelf.name != '' ?
                        <Stack direction="row" justifyContent="space-between" sx={{ padding: "10px", borderBottom: "2px solid #F3F3F3" }} onClick={() => addToShelf(shelf._id)}>
                            <Stack direction="row">
                                <Typography fontWeight="600" key={shelf.name} sx={{ padding: "0px 5px 0px 15px" }}>{shelf.name}</Typography>
                                <Typography color="#8D8D8D">({shelf.books.length})</Typography>
                            </Stack>
                            <ArrowForward sx={{ paddingRight: "15px" }} />
                        </Stack>
                        : null)}
                <Stack direction="row" justifyContent="center" sx={{ bgcolor: "#F3F3F3", padding: "20px" }} onClick={newShelf}>
                    <Add sx={{ color: "#8D8D8D", transform: "scale(0.6)" }} />
                    <Typography color="#8D8D8D">Create new shelf</Typography>
                </Stack>
            </Box>
        </Modal>
        </>
    )
}