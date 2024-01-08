import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import ProfileAvatar from "./ProfileAvatar";

export default function FollowerList({ list, handleClose }) {
    const navigate = useNavigate();

    return (
        list ? list.map((item) =>
            <Stack direction="row" alignItems="center" justifyContent="space-between"
                sx={{ paddingBottom: "10px", paddingTop: "10px", borderBottom: "1px solid #e6e6e6" }}
                key={item._id}
            >
                <Stack direction="row" alignItems="center">
                    <ProfileAvatar alt={item._id} handle={item._id} image={item.profile_picture} size={45} border={false}/>
                    <Typography fontWeight="600" sx={{ margin: "5px" }}>@{item._id}</Typography>
                </Stack>
                <Button variant="contained" onClick={() => {navigate(`/${item._id}`); handleClose();}}>View</Button>
            </Stack>
        ) : null
    )
}