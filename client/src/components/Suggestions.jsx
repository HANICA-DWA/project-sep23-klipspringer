import { Typography, ImageList, ImageListItem, Skeleton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "../Contexts.jsx";
import Bookcover from "./Bookcover.jsx";
import { useNavigate } from "react-router-dom";

export default function Suggestions() {
  const navigate = useNavigate();
  const { loggedIn, username } = useContext(LoggedInContext);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const suggestionNumber = [1, 2, 3, 4]

  useEffect(() => {
    fetch(
      import.meta.env.VITE_BACKEND_HOST +
      "/user/" +
      username +
      "?" +
      new URLSearchParams({
        fields: ["bookcase"],
      }),
      {
        method: "GET",
      }
    ).then((res) => {
      return res.json();
    }).then((res) => {
      const randomBook = res.bookcase[Math.floor(Math.random() * res.bookcase.length)];

      let array = [];
      for (let i = 0; i < 5; i++) {
        array.push(randomBook.subject[Math.floor(Math.random() * randomBook.subject.length)].replace(/([\s])/g, "+"))
      }
      getSuggestions(array)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  async function getSuggestions(subjects) {
    const searchSubjects = subjects.join("+OR+");
    const result = await fetch("https://openlibrary.org/search.json?q=subject:(" + searchSubjects + ")+AND+publish_year:[1971+TO+*]&limit=4");
    const data = await result.json();
    console.log(data)
    setSuggestions(data.docs);
    setLoading(false)
  }

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "700" }}>
        Suggestions
      </Typography>
      <ImageList sx={{ display: "flex", justifyContent: "center" }} cols={3} gap={10} >
        {loading ? suggestionNumber.map((item) => <Skeleton key={item} animation="wave" variant="rectangular" width={75} height={120} sx={{ marginRight: "10px" }} />) :
        suggestions.map((item) => (
          <ImageListItem sx={{ width: "85px", height: "130px" }} key={item.isbn[0]} onClick={() => navigate(`/book/${item.isbn[0]}`)}>
            <Bookcover isbn={item.isbn[0]} cover_image={`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg?default=false`} />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
