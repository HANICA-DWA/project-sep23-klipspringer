import { Typography, Card, Stack, CardMedia } from "@mui/material";

export default function Bookshelf({ title, books }) {
    return (
        <Stack direction="column" alignItems="center">
            <Typography variant="body1" fontWeight="600">{title}</Typography>
            <Stack direction="row" justifyContent="center" spacing={2}>
                {books.map(item =>
                    <Card key={item._id} style={{ width: "85px", height: "130px" }} >
                        <CardMedia height="130" component="img" image={item.url} alt="titel" />
                    </Card>
                )}
            </Stack>
            <img style={{ width: "320px", height: "20px" }} src="/images/bookshelf.jpg" alt="bookshelf"></img>
        </Stack>
    )
}