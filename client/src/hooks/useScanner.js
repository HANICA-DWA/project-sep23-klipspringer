import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useRef } from "react"

const useScanner = (scanDelay, onResult, onError) => {
    const video = useRef(null);
    const reader = useRef(new BrowserMultiFormatReader())
    const windowSize = useRef({width: window.innerWidth, height: window.innerHeight})

    reader.current.timeBetweenDecodingAttempts = scanDelay;

    useEffect(() => {
        if (!video.current) return;

        reader.current.decodeFromConstraints(
            {
                audio: false,
                video: {
                    facingMode: 'environment',
                    //width: windowSize.current.width,
                    //height: windowSize.current.height,
                },
            },
            video.current,
            (result, error) => {
                if (result) onResult(result)
                //if (error) onError(error);
            },
        );
        return () => {
            reader.current.reset();
        }
    }, [video]);

    return video;
}

export default useScanner;