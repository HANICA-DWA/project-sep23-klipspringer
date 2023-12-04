## External Interfaces

### Intent

BKS uses three different external interfaces. Namely openlibrary, google authentication and linkedin authentication. Openlibrary is hosted by archive.org as a non-profit tool for providing a database for all books ever written. It exposes its database through an API via http. It gives back results in JSON format. We use openlibrary to get all information regarding a specific book, like title, author, cover image, etc. We also use its search function to search through all books that exist. We also 'cache' books on our own database as to not overload the use of openlibrary. We query from the client and as little as possible as to not reach the rate limit of 100 requests in a short timespan.

Some examples of the requests we use:
```js 
fetch(apiUrl + "/isbn/" + req.params.id + ".json") // Get book by ISBN
const result = await fetch(`https://openlibrary.org/search.json?q=${urlTitle}&limit=10`); // Search by anything
const cover_url = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`; // Get cover image url by cover ID
```

We use Google and LinkedIn authentication very similarly. We use it to authenticate users. This happens via requests to their respective endpoints and libraries to get user tokens and basic user information. This info is received as JSON via http requests. These authentication providers are owned by Google and LinkedIn respectively, which are large companies expected to exist for a long time.
