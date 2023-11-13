import { Box, Link, Stack, Typography } from "@mui/material";

export default function Login() {
  return (
    <Stack
      useFlexGap
      gap={9}
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
        <Link href="#" variant="h6" color="inherit">
          Sign in with Google
        </Link>
        <Link href="#" variant="h6" color="inherit">
          Sign in with LinkedIn
        </Link>
      </Stack>
    </Stack>
  );
}
