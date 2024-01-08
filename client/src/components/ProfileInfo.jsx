import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProfileAvatar from "./ProfileAvatar";

export default function ProfileInfo({ name, avatar, handle }) {
  return (
    <Stack direction="column" alignItems="center" useFlexGap gap={1}>
      <ProfileAvatar clickable handle={handle} alt={name} image={avatar} />
      <Link to={`/${handle}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h6" fontWeight="700" sx={{ overflowWrap: "anywhere", maxWidth: "100%", textAlign: "center" }}>
          @{handle}
        </Typography>
      </Link>
    </Stack>
  );
}
