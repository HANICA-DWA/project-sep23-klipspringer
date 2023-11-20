import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Login } from "@mui/icons-material";

export default function Unauthorized() {
  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h1" fontWeight="900" gutterBottom>
            Uh-oh! Access Denied
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="300" paragraph>
            You've reached a restricted area. Are you sure you belong here?
          </Typography>
          <Typography variant="h5" fontWeight="300" paragraph>
            This is a top-secret zone. Shhh!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img src="/images/bookicon.png" alt="Logo" style={{ maxHeight: "25vh", marginBottom: "20px" }} />
        </Grid>
        <Grid item xs={12}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            startIcon={<Login style={{ transform: "scale(1.2)" }} />}
            sx={{ fontSize: "1rem" }}
          >
            Get me out of here!
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
