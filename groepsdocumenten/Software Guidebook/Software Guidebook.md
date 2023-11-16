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
