import {Box, Stack} from "@mui/material";
import ProfileInfo from "./ProfileInfo.jsx";
import Bookshelf from "./Bookshelf.jsx";
import {toPng} from "html-to-image";
import {useRef} from "react";

export default function SocialCard({ name = "", avatar = "", handle = "", top_three = [] }) {
    const elementRef = useRef(null);
    function htmlToImageConvert() {
        elementRef.current.style.display = "block";
        toPng(elementRef.current, { cacheBust: true })
            .then((dataUrl) => {
                elementRef.current.style.display = "none";
                const img = document.createElement("img");
                img.src = dataUrl;
                document.body.appendChild(img);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
        <Stack id="socialCard" ref={elementRef} justifyContent="flex-start" sx={{minHeight: "100vh",display:"none",backgroundColor: "white"}} spacing={3} useFlexGap>
            {/*<Box>*/}
                <ProfileInfo name={name} avatar={avatar} handle={handle}/>
                <Bookshelf
                    key={"top_three"}
                    id={"top_three"}
                    title={top_three.name??""}
                    books={top_three.books??[]}
                    user={top_three._id??""}
                />
            {/*</Box>*/}
        </Stack>
    <button onClick={htmlToImageConvert}>Download Image</button>
    </>
    );
}