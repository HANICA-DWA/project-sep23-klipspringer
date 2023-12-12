import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

export default function FollowerList({ list }) {
    return (
        list ? list.map((item) =>
            <Stack direction="row" alignItems="center" justifyContent="space-between"
                sx={{ paddingBottom: "10px", paddingTop: "10px", borderBottom: "1px solid #e6e6e6" }}>
                <Stack direction="row" alignItems="center">
                    <Avatar sx={{ width: 45, height: 45 }} alt={item._id} src={item.profile_picture} imgProps={{ referrerPolicy: "no-referrer" }} />
                    <Typography fontWeight="600" sx={{ margin: "5px" }}>@{item._id}</Typography>
                </Stack>
                <Button variant="contained">View</Button>
            </Stack>
        ) : null
    )
}