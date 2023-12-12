import { Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProfileAvatar({ alt, image, handle, clickable }) {
  const link = handle ? `/${handle}` : "";
  const imageLink = getAvatarUrl(image);
  return (
    <Box sx={{ padding: "3px", border: "1px solid grey", borderRadius: "50px" }}>
      {clickable ? (
        <Link to={link} style={{ textDecoration: "none" }}>
          <Avatar sx={{ width: 56, height: 56 }} alt={alt} src={imageLink && imageLink.href} imgProps={{ referrerPolicy: "no-referrer" }} />
        </Link>
      ) : (
        <Avatar sx={{ width: 56, height: 56 }} alt={alt} src={imageLink && imageLink.href} imgProps={{ referrerPolicy: "no-referrer" }} />
      )}
    </Box>
  );
}

function getAvatarUrl(stringUrl) {
  if (stringUrl) {
    try {
      return new URL(stringUrl);
    } catch (e) {
      return new URL(stringUrl, import.meta.env.VITE_BACKEND_HOST);
    }
  }
}
