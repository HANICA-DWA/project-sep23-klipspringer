import { Avatar, Button, Paper, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";

export default function SearchResultPerson({ closePopper, onClick, person }) {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState("none");

  function showImage() {
    setLoading(false);
    setShow("block");
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        height: "100px",
        margin: "14px 14px 14px 14px",
        padding: "0px 0px 0px 8px",
        border: "solid 3px #DAEADB",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        {loading ? <Skeleton animation="wave" variant="circular" width={50} height={50} sx={{ margin: "10px" }} /> : <></>}
        <ProfileAvatar alt={person._id} image={person.profile_picture} border={false} onLoad={showImage} />
        <div>
          <Typography variant="body1" sx={{ fontWeight: "700", marginX: "10px" }}>
            {person._id}
          </Typography>
        </div>
      </div>
      <Button
        onClick={() => {
          onClick({ type: "person", person: { _id: person._id } });
          closePopper();
        }}
        sx={{ marginX: "10px" }}
        variant="contained"
      >
        <Typography variant="button">View</Typography>
      </Button>
    </Paper>
  );
}
