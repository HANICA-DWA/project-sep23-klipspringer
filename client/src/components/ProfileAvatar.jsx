import { Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProfileAvatar({ alt, image, handle, clickable, border = true, onLoad, onError }) {
  const link = handle ? `/${handle}` : "";
  const imageLink = getAvatarUrl(image);
  const borderObject = border ? { padding: "3px", border: "1px solid grey", borderRadius: "50px" } : {};
  return (
    <Box sx={borderObject}>
      {clickable ? (
        <Link to={link} style={{ textDecoration: "none" }}>
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt={alt}
            src={imageLink && imageLink.href}
            imgProps={{ referrerPolicy: "no-referrer" }}
            onLoad={() => onLoad && onLoad()}
            onError={() => onError && onError()}
          />
        </Link>
      ) : (
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt={alt}
          src={imageLink && imageLink.href}
          imgProps={{ referrerPolicy: "no-referrer" }}
          onLoad={() => onLoad && onLoad()}
          onError={() => onError && onError()}
        />
      )}
    </Box>
  );
}

function getAvatarUrl(stringUrl) {
  if (stringUrl) {
    try {
      const url = new URL(stringUrl);
      if (!stringUrl.startsWith("data:image/")) url.searchParams.set("cacheBuster", new Date().getTime());
      return url;
    } catch (e) {
      const url = new URL(stringUrl, import.meta.env.VITE_BACKEND_HOST);
      url.searchParams.set("cacheBuster", new Date().getTime());
      return url;
    }
  }
}
