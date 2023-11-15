import { Typography, ImageList, ImageListItem } from "@mui/material";

export default function Suggestions() {
  const results = [1, 2, 3];
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "700" }}>
        Suggestions
      </Typography>

      <ImageList sx={{display: "flex", justifyContent: "space-between"}} cols={3} rowHeight={160} >
        {results.map((item) => (
          <ImageListItem sx={{width: "100px", height: "160px"}} key={item}>
            <img
              srcSet="https://placehold.co/100x160"
              src="https://placehold.co/100x160"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
