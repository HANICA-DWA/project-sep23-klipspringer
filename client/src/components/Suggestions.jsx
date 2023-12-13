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
    const suggestionsFunction = async () => {
      let array = ["Fantasy", "History", "Thriller", "Humor", "Literature"];
      if (loggedIn && username) {
        try {
          const response = await fetch(
            import.meta.env.VITE_BACKEND_HOST + "/user/" + username + "?" + new URLSearchParams({ fields: ["bookcase"] }),
            {
              method: "GET",
              credentials: "include",
              mode: "cors",
            }
          );
          const data = await response.json();
          const randomBook = data.bookcase[Math.floor(Math.random() * data.bookcase.length)];

          const subjectsResponse = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${randomBook._id}&format=json&jscmd=data`);
          const subjectsResult = await subjectsResponse.json();
          if (subjectsResult[`ISBN:${randomBook._id}`].subjects) {
            const subjects = subjectsResult[`ISBN:${randomBook._id}`].subjects.map((subject) => subject.name);

            for (let i = 0; i < 5; i++) {
              array.push(subjects[Math.floor(Math.random() * subjects.length)].replace(/([\s])/g, "+"));
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      getSuggestions(array);
    };
    suggestionsFunction();
  }, [loggedIn, username]);

  async function getSuggestions(subjects) {
    const searchSubjects = subjects.join("+OR+");
    const result = await fetch("https://openlibrary.org/search.json?q=subject:(" + searchSubjects + ")+AND+publish_year:[1971+TO+*]&limit=4");
    const data = await result.json();
    setSuggestions(data.docs);
    setLoading(false);
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
