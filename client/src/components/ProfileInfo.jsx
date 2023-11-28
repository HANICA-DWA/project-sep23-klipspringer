import { Avatar, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProfileInfo({ name, avatar, handle }) {
  return (
    <Stack direction="column" alignItems="center">
      <Link to={`/${handle}`}>
        <div
          style={{
            marginTop: "40px",
            marginBottom: "20px",
            padding: "3px",
            border: "1px solid grey",
            borderRadius: "50px",
          }}
        >
          <Avatar sx={{ width: 56, height: 56 }} alt={name} src={avatar} imgProps={{ referrerPolicy: "no-referrer" }} />
        </div>
      </Link>
      <Link to={`/${handle}`} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="h6" fontWeight="700" sx={{ overflowWrap: "anywhere", maxWidth: "100%", textAlign: "center" }}>
          @{handle}
        </Typography>
      </Link>
    </Stack>
  );
}
