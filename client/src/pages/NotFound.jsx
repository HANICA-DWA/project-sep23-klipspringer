import { Container, Typography, Button, Grid } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h1" fontWeight="900" gutterBottom>
            Oops! 404 - Not Found
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="300" paragraph>
            Looks like you've wandered into uncharted territory.
          </Typography>
          <Typography variant="h5" fontWeight="300" paragraph>
            Don't worry; even the best explorers get lost sometimes!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img src="/images/bookicon.png" alt="Logo" style={{ maxHeight: "25vh", marginBottom: "20px" }} />
        </Grid>
        <Grid item xs={12}>
          <Button size="large" component={Link} to="/" variant="contained" startIcon={<HomeIcon style={{ transform: "scale(1.3)" }} />}>
            <Typography variant="h6">Take me Home</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
