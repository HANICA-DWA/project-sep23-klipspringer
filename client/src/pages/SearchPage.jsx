import { Container, Typography, ImageList, ImageListItem } from "@mui/material";
import SearchBar from "../components/SearchBar";
import Suggestions from "../components/Suggestions";

export default function SearchPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: "50px",
      }}
    >
      <SearchBar />
      <Suggestions />
    </Container>
  );
}
