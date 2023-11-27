import { Box, Button, FormControl, InputAdornment, Stack, TextField, Typography } from "@mui/material";
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
  const [submitted, setSubmitted] = useState(false);
  const [existingUsers, setExistingUsers] = useState([]);
  const redirectURI = `${window.location.origin}/linkedin`;

  const onChange = (e) => {
    const value = e.target.value;
    setUsernameInput(value);
    const duplicate = existingUsers.find((user) => user == value);
    //TODO check if valid characters, no spaces
    if (duplicate) {
      setInputError("This user already exists");
    } else {
      setInputError(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputError) {
      console.log("Submitted");
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (loggedIn) navigate(`/profile/${username}`);

    const fetchExistingUsers = async () => {
      const response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/user");
      if (response.ok) {
        const data = await response.json();
        setExistingUsers(data);
      }
    };
    fetchExistingUsers();
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
          <Typography variant="h1" fontWeight="800">
            Create your shelf
          </Typography>
          <Typography textAlign="center" variant="h6" sx={{ opacity: 0.5 }}>
            Free to share your inspirational books, quotes and authors{" "}
          </Typography>
          <TextField
            value={`@${usernameInput}`}
            size="small"
            InputProps={{
              readOnly: true,
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
