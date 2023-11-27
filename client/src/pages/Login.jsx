import { Box, Button, Stack, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { LinkedIn } from "react-linkedin-login-oauth2";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../Contexts";

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const { loggedIn, username } = useContext(LoggedInContext);
  const [fetchError, setFetchError] = useState(null);
  const redirectURI = `${window.location.origin}/linkedin`;

  useEffect(() => {
    if (loggedIn) navigate(`/${username}`);
  }, [loggedIn, username]);

  return (
    <Stack
      useFlexGap
      gap={3}
      alignItems="center"
      sx={{
        mt: {
          xs: "10vh",
          md: "5vh",
        },
      }}
    >
      <Stack useFlexGap gap={2} alignItems="center">
        <Box
          display="flex"
          component="img"
          src="/images/bookicon.png"
          sx={{
            width: {
              xs: "90vw",
              md: "30vw",
            },
          }}
        ></Box>
        <Typography variant="h1" fontWeight="800">
          Express your shelf
        </Typography>
        <Typography textAlign="center" variant="h6" sx={{ opacity: 0.5 }}>
          Start sharing the things you've learned from great writers and inspire others!
        </Typography>
      </Stack>
      <Stack alignItems="center" useFlexGap gap={2}>
        {fetchError ? <Typography color="red">{fetchError}</Typography> : ""}
        <GoogleLogin
          shape="pill"
          text="signin_with"
          locale="en-US"
          onSuccess={async (response) => {
            const idToken = response.credential;
            const restResponse = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/sessions/google`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              mode: "cors",
              body: JSON.stringify({ idToken }),
            });
            const responseData = await restResponse.json();
            if (restResponse.ok) {
              if (responseData.status === "LOGGED_IN") {
                setLoggedIn({ loggedIn: true, username: responseData.username });
                navigate(`/${responseData.username}`);
              }
            } else {
              setFetchError(responseData.error);
            }
          }}
          onError={(response) => console.log(response)}
        />
        <LinkedIn
          clientId={import.meta.env.VITE_LINKEDIN_APP_ID}
          redirectUri={redirectURI}
          scope="openid email profile"
          onSuccess={async (code) => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/sessions/linkedin`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              mode: "cors",
              body: JSON.stringify({ authorizationCode: code }),
            });
            const responseData = await response.json();
            if (response.ok) {
              if (responseData.status === "LOGGED_IN") {
                setLoggedIn({ loggedIn: true, username: responseData.username });
                navigate(`/${responseData.username}`);
              }
            } else {
              setFetchError(responseData.error);
            }
          }}
          onError={(error) => {
            console.log(error);
          }}
        >
          {({ linkedInLogin }) => (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0077B5", color: "#fff", "&:hover": { backgroundColor: "#005885" }, borderRadius: "130px", py: "8px" }}
              onClick={linkedInLogin}
              startIcon={<LinkedInIcon />}
            >
              Sign in with LinkedIn
            </Button>
          )}
        </LinkedIn>
      </Stack>
      <Stack direction="row" useFlexGap gap={0.5}>
        <Typography sx={{ opacity: 0.5 }}>No account yet?</Typography>
        <Typography component={Link} to="/register" sx={{ textDecoration: "none", color: "black" }}>
          Sign Up
        </Typography>
      </Stack>
    </Stack>
  );
}
