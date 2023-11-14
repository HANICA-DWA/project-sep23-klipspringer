import { Typography, ImageList, ImageListItem } from "@mui/material";

export default function Suggestions() {
  const results = [1, 2, 3];
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "700" }}>
        Suggestions
      </Typography>

      <ImageList gap={20} cols={3} rowHeight={180} sx={{ width: "100%" }}>
        {results.map((item) => (
          <ImageListItem key={item}>
            <img
              srcSet="https://placehold.co/100x160"
              src="https://placehold.co/50x80"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
