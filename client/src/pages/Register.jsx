import { Box, Button, FormControl, FormHelperText, InputAdornment, Stack, TextField, Typography, Link } from "@mui/material";
import { AlternateEmail, Cancel, CheckCircleOutline } from "@mui/icons-material";
import { ArrowBackIos } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { LinkedIn } from "react-linkedin-login-oauth2";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logUserIn } from "../redux/reducers/profileReducer";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usernameInput, setUsernameInput] = useState("");
  const [inputError, setInputError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const redirectURI = `${window.location.origin}/linkedin`;

  const onChange = async (e) => {
    const value = e.target.value.trim();
    setUsernameInput(value);
    const regex = /^[\w]{1,30}$/;
    if (value && !regex.test(value)) {
      setInputError("Username can only contain letters, numbers, dots and underscores");
      return;
    }

    const response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/user/check/${value}`, { method: "HEAD" });
    if (response.ok) {
      setInputError(null);
    } else {
      setInputError("This user already exists");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputError) {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (profile.loggedIn) navigate(`/${profile._id}`);
  }, [profile.loggedIn, profile._id, navigate]);

  return (
    <Stack
      // useFlexGap
      // gap={4}
      alignItems="center"
      sx={{
        // mt: {
        //   xs: "10vh",
        //   md: "5vh",
        // },
        height: "100vh",
      }}
      justifyContent="space-between"
    >
      {!submitted ? (
        <>
          <Stack useFlexGap gap={2} alignItems="center" sx={{ marginTop: "30px" }}>
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
                  color={usernameInput && !inputError ? "success" : "primary"}
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
                        <Typography color="primary" fontSize="1rem" fontWeight="medium">
                          BKS.com/
                        </Typography>
                      </InputAdornment>
                    ),
                    endAdornment:
                      usernameInput && !inputError ? (
                        <InputAdornment position="end">
                          <CheckCircleOutline sx={{ color: "success.main" }} />
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end">
                          <Cancel
                            color={inputError ? "error" : "inherit"}
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              setUsernameInput("");
                              setInputError(null);
                            }}
                          />
                        </InputAdornment>
                      ),
                    style: { fontSize: "1rem" },
                  }}
                />
                {usernameInput && !inputError ? (
                  <FormHelperText id="username-success" filled sx={{ color: "success.main" }}>
                    Available!
                  </FormHelperText>
                ) : (
                  ""
                )}
                <Button variant="contained" color="primary" type="submit" sx={{ p: 1, fontSize: "0.9rem", mt: 2 }}>
                  Claim your shelf
                </Button>
              </FormControl>
            </form>
          </Stack>
        </>
      ) : (
        <Stack useFlexGap gap={2} alignItems="center" sx={{ marginTop: "30px" }}>
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
            Free to share your inspirational books, quotes and authors
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
                    dispatch(logUserIn({ username: responseData.username }));
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
                    dispatch(logUserIn({ username: responseData.username }));
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
      <Stack alignItems="center" sx={{ marginBottom: "10px" }}>
        <Stack direction="row" useFlexGap gap={0.5} sx={{ color: "success.main" }}>
          <Typography>Already on BKS?</Typography>
          <Typography component={Link} href="/login" sx={{ textDecoration: "none", color: "success.main" }}>
            Sign In
          </Typography>
        </Stack>
        <Box>
          <Typography align="center" color="#666666" variant="caption">
            By signing up, you agree to our{" "}
            <Link color="#666666" href={"/terms-of-service"}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link color="#666666" href={"/privacy-policy"}>
              Privacy Policy
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
