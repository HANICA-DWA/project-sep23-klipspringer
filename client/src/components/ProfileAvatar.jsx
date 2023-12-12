import { Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProfileAvatar({ alt, image, handle, clickable }) {
  const link = handle ? `/${handle}` : "";
  return (
    <Box sx={{ padding: "3px", border: "1px solid grey", borderRadius: "50px" }}>
      {clickable ? (
        <Link to={link}>
          <Avatar sx={{ width: 56, height: 56 }} alt={alt} src={image} imgProps={{ referrerPolicy: "no-referrer" }} />
        </Link>
      ) : (
        <Avatar sx={{ width: 56, height: 56 }} alt={alt} src={image} imgProps={{ referrerPolicy: "no-referrer" }} />
      )}
    </Box>
  );
}
