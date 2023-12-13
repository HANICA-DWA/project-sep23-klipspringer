import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";

export default function AuthorContainer({ children }) {
  const { author } = useParams();
  const [authorExist, setAuthorExist] = useState(null);

  useEffect(() => {
    const fetchAuthorExists = async (author) => {
      const response = await fetch(`https://openlibrary.org/authors/${author}.json`);
      response.ok ? setAuthorExist(true) : setAuthorExist(false);
    };
    fetchAuthorExists(author);
  }, [author]);

  if (authorExist === null) {
    return (
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <CircularProgress style={{ width: "15vh", height: "auto" }} />
      </Stack>
    );
  }

  return authorExist ? children : <NotFound />;
}
