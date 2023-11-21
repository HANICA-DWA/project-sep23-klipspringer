import { Box, Button, Stack, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { LinkedIn } from "react-linkedin-login-oauth2";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoggedInContext } from "../Contexts";

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const { loggedIn, username } = useContext(LoggedInContext);
  const redirectURI = `${window.location.origin}/linkedin`;

  useEffect(() => {
    if (loggedIn) navigate(`/profile/${username}`);
  }, [loggedIn, username]);

  return (
    <Stack
      useFlexGap
      gap={6}
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
        <GoogleLogin
          shape="pill"
          text="continue_with"
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
            if (responseData.status === "LOGGED_IN") {
              setLoggedIn({ loggedIn: true, username: responseData.username });
              navigate(`/profile/${responseData.username}`);
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
            if (responseData.status === "LOGGED_IN") {
              setLoggedIn({ loggedIn: true, username: responseData.username });
              navigate(`/profile/${responseData.username}`);
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
              Continue with LinkedIn
            </Button>
          )}
        </LinkedIn>
      </Stack>
    </Stack>
  );
}
