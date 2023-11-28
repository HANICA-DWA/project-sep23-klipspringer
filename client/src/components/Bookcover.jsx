import { Stack, Typography } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function Bookcover({ isbn, cover_image }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImageSrc = async () => {
      const response = await fetch(`http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`);
      if (response.status === 404) {
        if (cover_image) setImageSrc(cover_image);
      } else {
        setImageSrc(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`);
      }
    };
    fetchImageSrc();
  }, [isbn, cover_image]);

  return imageSrc ? (
    <img style={{ borderRadius: "5px", width: "auto", maxWidth: "100%", height: "100%", objectFit: "cover" }} src={imageSrc} alt={isbn} />
  ) : (
    <Stack height="100%" width="auto" justifyContent="center" alignItems="center" sx={{ border: "1px solid black", borderRadius: "5px" }}>
      <Stack alignItems="center" justifyContent="center">
        <ImageNotSupported sx={{ fontSize: 80 }} />
        <Typography variant="caption">No image found</Typography>
      </Stack>
    </Stack>
  );
}
