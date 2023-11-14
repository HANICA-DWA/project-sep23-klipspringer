import { Button, Paper, Typography } from "@mui/material";

export default function SearchResult() {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: "100px",
        margin: "14px 14px 0px 14px",
        padding: "0px 0px 0px 8px",
        border: "solid 3px #DAEADB",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          style={{
            width: "50px",
            height: "85px",
            marginRight: "10px",
          }}
          src="https://placehold.co/50x80"
          alt="boek plaatje"
        ></img>
        <div>
          <Typography variant="body1" sx={{ fontWeight: "700" }}>
            Boeknaam
          </Typography>
          <Typography variant="caption">Auteurnaam</Typography>
        </div>
      </div>
      <Button sx={{ marginRight: "10px" }} variant="contained">
        <Typography variant="button">Add</Typography>
      </Button>
    </Paper>
  );
}
