
import { Typography, Card, Button, Avatar, Stack, CardMedia } from "@mui/material";

function Profilepage() {
  return (
    <Stack justifyContent="space-around" style={{ height: "100vh" }}>
      <Stack direction="column" alignItems="center">
        <Avatar alt="Voornaam Achternaam" src="https://react.semantic-ui.com/images/wireframe/image.png" />
        <Typography variant="body2" fontWeight="600">Voornaam Achternaam</Typography>
      </Stack>

      <Stack direction="column" alignItems="center">
        <Typography variant="body1" fontWeight="600">My top 3 books</Typography>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Card style={{ width: "85px", height: "130px" }} >
            <CardMedia height="130" component="img" image="https://react.semantic-ui.com/images/wireframe/image.png" alt="titel" />
          </Card>
          <Card style={{ width: "85px", height: "130px" }} >
            <CardMedia height="130" component="img" image="https://react.semantic-ui.com/images/wireframe/image.png" alt="titel" />
          </Card>
          <Card style={{ width: "85px", height: "130px" }} >
            <CardMedia height="130" component="img" image="https://react.semantic-ui.com/images/wireframe/image.png" alt="titel" />
          </Card>
        </Stack>
        <img style={{ width: "320px", height: "20px" }} src="/images/bookshelf.jpg" alt="bookshelf"></img>
      </Stack>

      <Stack direction="column" alignItems="center">
        <Button color="secondary" variant="contained" style={{fontSize: "12px"}}>Create your own shelf</Button>
      </Stack>
    </Stack>
  )
}
export default Profilepage;
