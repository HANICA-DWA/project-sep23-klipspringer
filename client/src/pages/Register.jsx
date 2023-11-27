import { Box, Button, FormControl, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { AlternateEmail } from "@mui/icons-material";
import { ArrowBackIos } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { LinkedIn } from "react-linkedin-login-oauth2";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../Contexts";

export default function Register({ setLoggedIn }) {
  const navigate = useNavigate();
  const { loggedIn, username } = useContext(LoggedInContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [inputError, setInputError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const redirectURI = `${window.location.origin}/linkedin`;

  const onChange = async (e) => {
    const value = e.target.value.trim();
    setUsernameInput(value);
    const regex = /^[\w.]{1,30}$/;
    if (value && !regex.test(value)) {
      setInputError("Username can only contain letters, numbers, dots and underscores");
      return;
    }

    const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/${value}`, { method: "HEAD" });
    if (response.ok) {
      setInputError("This user already exists");
    } else {
      setInputError(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputError) {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (loggedIn) navigate(`/${username}`);
  }, [loggedIn, username]);

  return (
    <Stack
      useFlexGap
      gap={4}
      alignItems="center"
      sx={{
        mt: {
          xs: "10vh",
          md: "5vh",
        },
      }}
    >
      {!submitted ? (
        <>
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
          <Stack>
            <form onSubmit={onSubmit}>
              <FormControl>
                <TextField
                  variant="outlined"
                  color="secondary"
                  id="username"
                  name="username"
                  placeholder="yourname"
                  value={usernameInput}
                  onChange={onChange}
                  autoFocus
                  required
                  error={inputError ? true : false}
                  helperText={inputError}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography color="secondary" fontSize="1rem" fontWeight="medium">
                          BKS.com/
                        </Typography>
                      </InputAdornment>
                    ),
                    style: { fontSize: "1rem" },
                  }}
                />
                <Button variant="contained" color="secondary" type="submit" sx={{ p: 1, fontSize: "0.9rem", mt: 2 }}>
                  Claim your shelf
                </Button>
              </FormControl>
            </form>
          </Stack>
        </>
      ) : (
        <Stack useFlexGap gap={2} alignItems="center">
          <Stack direction="row" alignItems="center" useFlexGap gap={2}>
            <ArrowBackIos
              onClick={() => {
                setSubmitted(false);
                setFetchError(null);
              }}
            />
            <Typography variant="h1" fontWeight="800">
              Create your shelf
            </Typography>
          </Stack>
          <Typography textAlign="center" variant="h6" sx={{ opacity: 0.5 }}>
            Free to share your inspirational books, quotes and authors{" "}
          </Typography>
          <TextField
            value={usernameInput}
            size="small"
            error={fetchError ? true : false}
            helperText={fetchError}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              ),
            }}
          />
          <Stack alignItems="center" useFlexGap gap={2}>
            <GoogleLogin
              shape="pill"
              text="signup_with"
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
                  body: JSON.stringify({ idToken, username: usernameInput }),
                });
                const responseData = await restResponse.json();
                if (restResponse.ok) {
                  if (responseData.status === "LOGGED_IN") {
                    setLoggedIn({ loggedIn: true, username: responseData.username });
                    navigate(`/${responseData.username}`);
                  }
                } else {
                  setFetchError(`${responseData.error}. Go back to change it.`);
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
                  body: JSON.stringify({ authorizationCode: code, username: usernameInput }),
                });
                const responseData = await response.json();
                if (response.ok) {
                  if (responseData.status === "LOGGED_IN") {
                    setLoggedIn({ loggedIn: true, username: responseData.username });
                    navigate(`/${responseData.username}`);
                  }
                } else {
                  setFetchError(`${responseData.error}. Go back to change it.`);
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
                  Sign up with LinkedIn
                </Button>
              )}
            </LinkedIn>
          </Stack>
        </Stack>
      )}
      <Stack direction="row" useFlexGap gap={0.5}>
        <Typography sx={{ opacity: 0.5 }}>Already on BKS?</Typography>
        <Typography component={Link} to="/login" sx={{ textDecoration: "none", color: "black" }}>
          Sign In
        </Typography>
      </Stack>
    </Stack>
  );
}
