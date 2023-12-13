import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";

export default function ProfileContainer() {
  const { userName } = useParams();
  const [userExist, setUserExist] = useState(null);

  useEffect(() => {
    const fetchUserExists = async (user) => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_HOST +
          "/user/" +
          user +
          "?" +
          new URLSearchParams({
            fields: ["_id"],
          })
      );
      setUserExist(response.ok);
    };
    fetchUserExists(userName);
  }, [userName]);

  if (userExist === null) {
    return (
      <Stack height="100vh" alignItems="center" justifyContent="center">
        <CircularProgress style={{ width: "15vh", height: "auto" }} />
      </Stack>
    );
  }

  return userExist ? <Outlet /> : <NotFound />;
}
