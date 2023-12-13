import { Typography, Chip} from "@mui/material";
import { Fragment, useEffect, useState } from "react";

export default function Genres({setChips, selectedChips}){
    const [genres, setGenres] = useState([])
    const chipStyle = {margin: "0px 5px 5px 0px"}

    useEffect(() => {
        getGenres()
      }, []);

    async function getGenres(){
        const result = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/genre`);
        const data = await result.json();
        setGenres(data);
    }
    return(
        <>
            <Typography variant="h6" sx={{ fontWeight: "700" }}>Genres</Typography>
            {
                genres.map((e) => {
                    return (
                        <Fragment key={e._id} >
                            <Typography key={e._id} variant="body1">{e._id}</Typography>
                            {
                                e.subgenres.map((g) => {    
                                    return <Chip 
                                                sx={chipStyle} 
                                                disabled={selectedChips.find((e) => e === g._id) ? true : false } 
                                                key={g._id} label={g._id} 
                                                variant="outlined" 
                                                onClick={() =>{
                                                    setChips([...selectedChips, g._id])
                                                }} 
                                            />
                                })
                            }
                        </Fragment>
                    )
                })
            }
        </>
    )
}