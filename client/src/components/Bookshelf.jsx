import {Typography, Card, Stack, CardMedia, ImageList, Link} from "@mui/material";
import {useEffect} from "react";

export default function Bookshelf({ title, books }) {
      let loggedIn = true; // FIXME replace with actual login status

      for (let i = books.length; i < 3; i++) {
            placeholderBooks.push((
                  <Card style={{ width: "85px", height: "130px" }} >
                        <Link href={"/search"}><CardMedia height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" /></Link>
                  </Card>
            ));
      }

    return (
        <Stack direction="column" alignItems="center">
            <Typography gutterBottom variant="h5" fontWeight="800">{title}</Typography>
            <Stack direction="row" justifyContent="center" spacing={2}>
                  <ImageList cols={3}>
                {books.map(item =>(
                    <Card key={item._id} style={{ width: "85px", height: "130px" }} >
                        <Link href={"#"}><CardMedia height="130" component="img" image={item.cover_image} alt="titel" /></Link>
                    </Card>
                ))}
                        {placeholderBooks.length!==0?
                              placeholderBooks:
                              (<Card style={{ width: "85px", height: "130px" }} >
                                    <Link href={"/search"}><CardMedia height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" /></Link>
                              </Card>)
                        }

                  {/*{loggedIn&&books.length<2?(*/}
                  {/*      <>*/}
                  {/*            <Card style={{ width: "85px", height: "130px" }} >*/}
                  {/*                  <Link href={"/search"}><CardMedia height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" /></Link>                                    <CardMedia height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" />*/}
                  {/*            </Card>*/}
                  {/*            <Card style={{ width: "85px", height: "130px" }} >*/}
                  {/*                  <Link href={"/search"}><CardMedia height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" /></Link>*/}
                  {/*            </Card>*/}
                  {/*      </>*/}
                  {/*):""}*/}
                  {/*{loggedIn&&books.length>1?(*/}
                  {/*      <Card style={{ width: "85px", height: "130px" }} >*/}
                  {/*            <Link href={"/search"}><CardMedia height="130" component="img" image={"/images/Add-Icon.jpg"} alt="voeg een boek toe" /></Link>*/}
                  {/*      </Card>*/}
                  {/*):""}*/}

                  </ImageList>
            </Stack>
            <img style={{ width: "320px", height: "20px" }} src="/images/bookshelf.jpg" alt="bookshelf"></img>
        </Stack>
    )
}