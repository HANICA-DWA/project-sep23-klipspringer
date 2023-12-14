import {Box, Stack} from "@mui/material";
import ProfileInfo from "./ProfileInfo.jsx";
import Bookshelf from "./Bookshelf.jsx";

export default function SocialCard({elementRef, name, avatar, handle, top_three = [] }) {

    return (
        <>
        <Stack id="socialCard" ref={elementRef} sx={{minHeight: "50vh"}} spacing={3} useFlexGap justifyContent="center">
            <Box sx={{bgcolor: "white"}}>
                <ProfileInfo name={name??""} avatar={avatar??""} handle={handle??""}/>
                <Bookshelf
                    key={"top_three"}
                    id={"top_three"}
                    title={top_three.name??""}
                    books={top_three.books??[]}
                    user={top_three._id??""}
                    hideAdding
                />
            </Box>
        </Stack>
    </>
    );
}