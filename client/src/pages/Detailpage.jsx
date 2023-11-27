import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Add, ArrowBackIosNew, ArrowOutward, ImageNotSupported } from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";

export default function Detailpage({ setLoggedIn }) {
    const isbn = useParams().isbn;

    const item = { cover_image: undefined } //"https://covers.openlibrary.org/b/id/14453897-M.jpg"

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <ArrowBackIosNew sx={{ margin: "20px" }} />
                <Header setLoggedIn={setLoggedIn} />
            </Stack>
            <Stack alignItems="center">
                {item.cover_image !== undefined ? (
                    <img src={item.cover_image} alt="titel" style={{ margin: "10px" }} height="280px" />
                ) : (
                    <Box sx={{ margin: "10px", height: "280px" }}>
                        <Stack justifyContent="center" sx={{height: "100%"}}>
                            <ImageNotSupported sx={{ fontSize: 100 }} />
                            <Typography variant="body1">No image found</Typography>
                        </Stack>
                    </Box>
                )}
                <Box sx={{ margin: "10px" }}>
                    <Typography variant="h2" fontWeight="700">
                        Titel
                    </Typography>
                    <Typography variant="h6" color="#6A9D8A">
                        Auteur
                    </Typography>
                </Box>
                <Chip sx={{ margin: "10px", fontSize: "14px" }} color="secondary" icon={<Add style={{ transform: "scale(0.7)" }} />} label="Add to shelf" />
                <Chip sx={{ margin: "10px", fontSize: "14px" }} color="primary" icon={<ArrowOutward style={{ transform: "scale(0.7)" }} />} label="Buy" />
            </Stack>
        </>
    )
}