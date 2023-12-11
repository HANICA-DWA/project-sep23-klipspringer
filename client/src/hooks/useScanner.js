import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useRef } from "react"

const useScanner = (scanDelay, onResult) => {
    const video = useRef(null);
    const reader = useRef(new BrowserMultiFormatReader())

    reader.current.timeBetweenDecodingAttempts = scanDelay;

    useEffect(() => {
        if (!video.current) return;

        reader.current.decodeFromConstraints(
            {
                audio: false,
                video: {
                    facingMode: 'environment',
                },
            },
            video.current,
            (result, error) => {
                if (result) onResult(result)
            },
        );
        return () => {
            reader.current.reset();
        }
    }, [video]);

    return video;
}

export default useScanner;