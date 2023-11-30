- [Software Guidebook BKS](#software-guidebook-bks)
- [C4-models](#c4-models)
  - [Context](#context)
  - [Container](#container)
  - [Component React + Vite](#component-react--vite)
  - [Component REST API](#component-rest-api)
  - [Component MongoBD](#component-mongobd)
- [Wireframes](#wireframes)
  - [Loginpage](#loginpage)
  - [Profilepage](#profilepage)
  - [Searchpage](#searchpage)
  - [Search results](#search-results)
- [REST API](#rest-api)
  - [User](#user)
  - [Book](#book)
  - [Sessions](#sessions)
- [Database schemas](#database-schemas)
  - [User schema](#user-schema)
  - [Book schema](#book-schema)
- [Domain terms](#domain-terms)

# Software Guidebook BKS

# C4-models

## Context

![Context model](C4-models/C4-model%20context.png)

## Container

![Container model](C4-models/C4-model%20container.png)

## Component React + Vite

![Component frontend](C4-models/C4-model%20component%20react+vite.png)

## Component REST API

![Component REST API](C4-models/C4-model%20component%20REST%20API.png)

## Component MongoBD

![Component MongoDB](C4-models/C4-model%20component%20MongoDB.png)

# Wireframes

## Loginpage

![Wireframe loginpage](Wireframes/login%20pagina%20met%20componenten.png)

## Profilepage

![Wireframe profilepage](Wireframes/profiel%20pagina%20met%20componenten.png)

## Searchpage

![Wireframe searchpage](Wireframes/search%20pagina%20met%20componenten.png)

## Search results

![Wireframe search results](Wireframes/search%20results%20met%20componenten.png)

# REST API

## User

> **`GET`** `/user/`

Get a list of users.

_query_parameters_

`fields` - Array of fields that the request wants to receive.

_returns_

```json
{
    "_id": String,
    "profile_picture": String
}
```

> **`HEAD`** `/user/check/:username`

Checks if a username already exists and is valid.

_parameters_

`:username` - Username to check

> **`GET`** `/user/:username`

Get a specific user's data.

_parameters_

`:username` - Username in database.

_query_parameters_

`fields` - Array of fields that the request wants to receive.

_returns_

```json
{
    "_id": String,
    "name": String,
    "top_three": [{
        "_id": Number,
        "cover_image": String,
    }],
    "shelf": [{
        "name": String,
        "books": [{
            "_id": Number,
            "cover_image": String,
        }],
    }],
}
```

> **`POST`** `/user/:username/shelf`

Post a new shelf to a user

_parameters_

`:username` - Username in database.

_returns_

```json
{
    "name": String,
    "books": [{
        "_id": Number,
        "cover_image": String,
    }],
}
```

## Book

> **`GET`** `/book/:id`

Get a specific books cover image.

_parameters_

`:id` - ISBN number.

_returns_

```json
{
    "_id": Number,
    "cover_image": String,
}
```

## Sessions

> **`POST`** `/sessions/google`

Post to a session when logging in with google

_returns_

```json
{
    "status": String,
    "username": String,
}
```

> **`POST`** `/sessions/linkedin`

Post to a session when logging in with linkedin

_returns_

```json
{
    "status": String,
    "username": String,
}
```

> **`DELETE`** `/sessions`

Deletes from a session

_returns_

```json
{
    "status": String,
}
```

> **`GET`** `/sessions/current`

Get the current session

_returns_

```json
{
    "loggedIn": Boolean,
    "username": String,
}
```

# Database schemas

## User schema

```js
_id: { type: String, required: true },
sso_id: { type: String },
sso_provider: { type: String, enum: ["Google", "LinkedIn"] },
name: { type: String, required: true },
profile_picture: { type: String, required: true, default: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" },
top_three: { type: [Book.schema] },
shelf: {
  type: [
    {
      name: { type: String },
      books: { type: [Book.schema] },
    },
  ],
},
bookcase: { type: [Book.schema] },
```

## Book schema

Images of saved books of a user are saved in our database (from the external API), so the images are loaded easily and faster.

```js
_id: { type: String, required: true },
cover_image: { type: String },
```

# Domain terms

| **Term (NL)** | **Term (EN)** | **Betekenis**                                                           | **Synoniemen**       |
| ------------- | ------------- | ----------------------------------------------------------------------- | -------------------- |
| Boekenplank   | Shelf         | Een verzameling van boeken, samengesteld door de gebruiker              | Collectie, categorie |
| Boekenkast    | Bookcase      | Een overzicht van alle boeken die een gebruiker in zijn account heeft   |                      |
| ISBN          | ISBN          | Uniek id nummer van een boek                                            |                      |
| Auteur        | Author        | Persoon die een boek heeft geschreven                                   |                      |
| Titel         | Title         | De naam van een boek                                                    | Naam                 |
| Favorieten    | Favorites     | Een speciale collectie met de favoriete boeken van een gebruiker        | Voorkeuren           |
| Suggestie     | Suggestions   | Suggesties voor boeken op basis van de opgeslagen boeken in een account | Aanbeveling, advies  |
| Delen         | Share         | Het kopiëren van een link naar een profielpagina                        |                      |
