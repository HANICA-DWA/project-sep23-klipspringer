import { Stack, Typography } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";
import {  useState } from "react";

export default function Bookcover({ isbn, cover_image, border, large }) {
  const [imageSrc, setImageSrc] = useState(`http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`);

  const handleImageError = () => {
    if (cover_image && cover_image !== imageSrc) {
      setImageSrc(cover_image);
    } else {
      setImageSrc(null);
    }
  };

  return imageSrc ? (
    <img
      style={{ borderRadius: "5px", width: "auto", maxWidth: "100%", height: "100%", objectFit: "cover" }}
      src={imageSrc}
      onError={handleImageError}
      alt={isbn}
    />
  ) : (
    <Stack
      height="100%"
      width="auto"
      justifyContent="center"
      alignItems="center"
      sx={{ border: border ? "1px solid black" : "", borderRadius: "5px" }}
    >
      <Stack alignItems="center" justifyContent="center">
        <ImageNotSupported sx={{ fontSize: large ? 100 : 80 }} />
        <Typography variant={large ? "body1" : "caption"}>No image found</Typography>
      </Stack>
    </Stack>
  );
}
