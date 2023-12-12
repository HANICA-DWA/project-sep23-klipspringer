import { Stack, CircularProgress } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";

export default function ShelfContainer() {
  const { userName, shelf } = useParams();
  const [shelfExist, setShelfExist] = useState(null);

  useEffect(() => {
    const fetchShelfExists = async (shelf) => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_HOST +
          "/user/" +
          userName +
          "?" +
          new URLSearchParams({
            fields: ["shelf"],
          })
      );
      const data = await response.json();
      response.ok ? setShelfExist(Boolean(data.shelf.find((responseShelf) => responseShelf._id === shelf))) : setShelfExist(false);
    };
    shelf === "top_three" ? setShelfExist(true) : fetchShelfExists(shelf);
  }, [shelf, userName]);

  if (shelfExist === null) {
    return (
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <CircularProgress style={{ width: "15vh", height: "auto" }} />
      </Stack>
    );
  }

  return shelfExist ? <Outlet /> : <NotFound />;
}
