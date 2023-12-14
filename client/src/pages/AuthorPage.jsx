import { Box, CircularProgress, ImageList, ImageListItem, Pagination, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Bookcover from "../components/Bookcover";
import { useTheme } from "@emotion/react";
import Header from "../components/Header";
import { ArrowBackIos } from "@mui/icons-material";

export default function AuthorPage() {
  const { author } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [authorWorks, setAuthorWorks] = useState({ size: 1, works: [] });
  const [authorInfo, setAuthorInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const itemsOnPage = 30;
  const theme = useTheme();
  const matchDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorWorks = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/authors/${author}/works.json?limit=${itemsOnPage}&offset=${((searchParams.get("page") || 1) - 1) * itemsOnPage}`
        );
        const data = await response.json();
        const authorInfoResponse = await fetch(`https://openlibrary.org/authors/${author}.json`);
        const authorInfoResult = await authorInfoResponse.json();
        const workIds = data.entries.map((entry) => entry.key.substring(7));
        const promises = workIds.map(async (workId) => {
          let editionResponse = await fetch(`https://openlibrary.org/works/${workId}/editions.json`);
          let editionData = await editionResponse.json();
          if (editionData.entries.length === 0) {
            editionResponse = await fetch(`https://openlibrary.org/works/${workId}.json`);
            editionData = await editionResponse.json();
          } else {
            editionData = editionData.entries[0];
          }
          return editionData;
        });

        const workData = await Promise.all(promises);
        setAuthorInfo({ name: authorInfoResult.name });
        setAuthorWorks({
          size: data.size,
          works: workData.map((work) => ({
            coverId: work.covers ? work.covers[0] : undefined,
            isbn: work.isbn_13 ? work.isbn_13 : work.isbn_10,
          })),
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAuthorWorks();
  }, [author, searchParams.get("page")]);

  const onChangePage = (e, p) => {
    setSearchParams({ page: p });
    if (Number(searchParams.get("page")) !== p) setLoading(true);
  };

  return (
    <>
      <Header />
      <ArrowBackIos onClick={() => navigate(-1)} sx={{paddingLeft: "15px"}}/>
      <Stack direction="column" alignItems="center" my={6} gap={1}>
        <Typography variant="h4" fontWeight="700">
          Books by
        </Typography>
        <Typography variant="h4" color="#6A9D8A">
          {authorInfo.name}
        </Typography>
        {loading ? (
          <Stack height="65vh" alignItems="center" justifyContent="center">
            <CircularProgress style={{ width: "15vh", height: "auto" }} />
          </Stack>
        ) : (
          <Box sx={{ width: { xs: "90vw", sm: "70vw", md: "50vw", lg: "60vw" } }}>
            <ImageList cols={matchDownLg ? 3 : 6} gap={8} rowHeight={matchDownLg ? 180 : 250}>
              {authorWorks.works.map((work, index) => (
                <ImageListItem
                  key={`${work.isbn}${index}`}
                  component={Link}
                  to={work.isbn && `/book/${work.isbn}`}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <Bookcover coverId={work.coverId} border large={!matchDownLg} />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
        <Pagination
          count={Math.ceil(authorWorks.size / itemsOnPage)}
          page={Number(searchParams.get("page")) || 1}
          onChange={onChangePage}
          size={matchDownLg ? "small" : "large"}
          color="primary"
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Stack>
    </>
  );
}
