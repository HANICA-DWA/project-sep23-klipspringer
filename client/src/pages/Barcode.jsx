import { useNavigate } from 'react-router-dom';
import useScanner from '../hooks/useScanner'
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ArrowBackIos } from '@mui/icons-material';

export default function Barcode() {
    
    const handleScanResult = (result) => {
        navigate("/book/" + result.text)
    }

    const video = useScanner(500, handleScanResult);
    const navigate = useNavigate()

    return (
        <Stack flexDirection="column" justifyContent="center" minHeight="100vh" alignItems="center" sx={{ backgroundColor: '#000000', overflow: "hidden"}}>
            <ArrowBackIos color="primary" onClick={() => navigate(-1)} sx={{position: "absolute", top: "16px", left: "16px"}}/>
            <video ref={video} />
        </Stack>
    )
}