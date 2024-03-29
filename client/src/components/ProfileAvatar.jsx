import { Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProfileAvatar({ alt, image, handle, clickable, border = true, onLoad, onError, size = 56, noCache = true }) {
  const link = handle ? `/${handle}` : "";
  const imageLink = getAvatarUrl(image, noCache);
  const borderObject = border ? { padding: "3px", border: "1px solid grey", borderRadius: "50px" } : {};
  return (
    <Box sx={borderObject} data-testid="avatar-div">
      {clickable ? (
        <Link to={link} style={{ textDecoration: "none" }} data-testid="avatar-link">
          <Avatar
            sx={{ width: size, height: size }}
            alt={alt}
            src={imageLink && imageLink.href}
            imgProps={{ referrerPolicy: "no-referrer" }}
            onLoad={() => onLoad && onLoad()}
            onError={() => onError && onError()}
          />
        </Link>
      ) : (
        <Avatar
          sx={{ width: size, height: size }}
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

function getAvatarUrl(stringUrl, noCache) {
  if (stringUrl) {
    try {
      const url = new URL(stringUrl);
      if (!stringUrl.startsWith("data:image/") && noCache) url.searchParams.set("cacheBuster", new Date().getTime());
      return url;
    } catch (e) {
      const url = new URL(stringUrl, import.meta.env.VITE_BACKEND_HOST);
      if (noCache) url.searchParams.set("cacheBuster", new Date().getTime());
      return url;
    }
  }
}
