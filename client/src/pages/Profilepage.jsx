
import { Typography, Button, Avatar, Stack} from "@mui/material";
import Bookshelf from "../components/Bookshelf";

function Profilepage() {

  const books = [
    {
      _id: 324324,
      url: "https://react.semantic-ui.com/images/wireframe/image.png"
    },
    {
      _id: 4546666,
      url: "https://react.semantic-ui.com/images/wireframe/image.png"
    },
    {
      _id: 8798000,
      url: "https://react.semantic-ui.com/images/wireframe/image.png"
    }
]

  return (
    <Stack justifyContent="space-around" style={{ height: "100vh" }}>
      <Stack direction="column" alignItems="center">
        <Avatar alt="Voornaam Achternaam" src="https://react.semantic-ui.com/images/wireframe/image.png" />
        <Typography variant="body2">Voornaam Achternaam</Typography>
      </Stack>

      <Bookshelf title="My top 3 books" books={books}/>

      <Stack direction="column" alignItems="center">
        <Button variant="contained">Create your own shelf</Button>
      </Stack>
    </Stack>
  )
}
export default Profilepage;
