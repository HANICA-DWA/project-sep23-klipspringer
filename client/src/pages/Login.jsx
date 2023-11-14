import { Box, Stack, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
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
            fetch(`${import.meta.env.VITE_BACKEND_HOST}/sessions/google`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              mode: "cors",
              body: JSON.stringify({ idToken }),
            });
          }}
          onError={(response) => console.log(response)}
        />
      </Stack>
    </Stack>
  );
}
