import { useNavigate } from 'react-router-dom';
import useScanner from '../hooks/useScanner'
import { Stack } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';

export default function Barcode({onAdd, closeScanner, setIsScanning}) {

    const fetchBookData = async (isbn) => {
        try {
            const data = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
            const book = await data.json();
            return book[`ISBN:${isbn}`];
        }
        catch (err) {console.log(err)}
    }

    const onResult = async (result) => {
        setIsScanning(false);
        const bookdata = await fetchBookData(result.text)
        console.log(bookdata);
        onAdd({
            _id: result.text,
            cover_image: bookdata.cover ? bookdata.cover.medium : undefined,
            title: bookdata.title,
            authors: bookdata.authors ? bookdata.authors.map((author) => author.name) : [],
          })
    }

    const video = useScanner(500, onResult);
    const navigate = useNavigate()

    return (
        <div style={{width: "100vw", height: "100vh", position: "absolute", top: "0", left: "0", zIndex: "100"}}>
            <Stack flexDirection="column" justifyContent="center" minHeight="100vh" alignItems="center" sx={{ backgroundColor: '#000000', overflow: "hidden"}}>
                <ArrowBackIos color="primary" 
                    onClick={() => {
                        setIsScanning(false)
                        closeScanner()
                    }} 
                    sx={{position: "absolute", top: "16px", left: "16px"}}/>
                <video ref={video} />
            </Stack>
        </div>
    )
}