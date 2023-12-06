# **Inhoudsopgave**

- [**Inhoudsopgave**](#inhoudsopgave)
- [Context](#context)
- [Functional Overview](#functional-overview)
  - [Link met meer informatie](#link-met-meer-informatie)
- [Quality Attributes](#quality-attributes)
- [Constraints](#constraints)
- [Principles](#principles)
- [C4-models](#c4-models)
  - [Context](#context-1)
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

# Context

![Context Diagram](C4-models/C4-model%20context.png)

BKS wordt een mobile-first webapplicatie van een persoonlijke boekenpagina. Met deze applicatie kun een gebruiker zijn leesvoorkeuren delen, zoals favoriete boeken, top 3 boeken, diverse collecties en je kunt zelfs een aangepaste collectie maken.

Deze software wordt gebruikt door 2 verschillende soorten gebruikers, anonieme gebruikers en geauthenticeerde gebruikers. De anononieme gebruiker kan profielen van anderen en boeken bekijken. Ook kan een anonieme gebruiker inloggen om een geauthenticeerde gebruiker te worden.
Een geauthenticeerde gebruiker kan zijn eigen profielpagina bewerken, boekenplanken toevoegen, bewerken en verwijderen. Hij heeft ook inzicht in zijn boekenkast en kan hier ook aanpassingen aan doen.

De software van BKS gebruikt 3 externe systemen, die van Google en LinkedIn voor het authenticeren van gebruikers. En het systeem van OpenLibrary om informatie van boeken op te halen.

# Functional Overview

Gebruikers kunnen een account aanmaken via LinkdIn of Google. Zodra een gebruiker een account heeft, komt hij uit op zijn eigen profielpagina.
Hier staat al een "top 3" plank voor de gebruiker klaar. Ook kan de gebruiker zelf een plank aanmaken. Op deze planken kunnen boeken toegevoegd worden. De gebruiker kan hierbij boeken zoeken en deze vervolgens toevoegen aan de plank. Zijn profiel en de gemaakte planken zijn openbaar, waardoor de gebruiker zijn profiel kan delen met anderen. De gebruiker kan per boek een informatiepagina openen. Via deze pagina kan het boek ook gekocht worden via een webshop.

Het kopen van boeken moet via een affiliate link gaan van bijvoorbeeld bol.com of amazon.com.

### Link met meer informatie

[Link naar userstory's](../Projectplan/Product%20Backlog.md)

[Link naar wireframe's](https://www.sketch.com/s/a50a2622-b344-4f1d-afd9-7f2bf52a80a1)

# Quality Attributes

- Applicatie moet mobile-first zijn. Wij gebruiken de iphone SE tijdens development voor het testen.
- Applicatie moet responsive zijn, voor zowel mobiel als desktop en alles daar tussen in.
- Applicatie moet snel zijn. Pagina's moeten laden binnen 2 seconden.
- Inloggen wordt geregeld via Google en LinkdIn SSO.
- Authenticatie wordt op de backend server verwerkt.
- API requests naar de backend server duren niet langer dan 500ms.
- Testcoverage is minimaal 90%.
- Voor de boeken wordt de externe (gratis) API gebruikt van OpenLibrary.
- Frontend wordt volgens de designs van Rik gemaakt.
- Teksten zijn in het engels.

# Constraints

# Principles

- DRY (Don't Repeat Yourself):

  We maken voor dingen die we vaker gebruiken een component of functie, zodat deze herbruikbaar is.

- Prefer a Rich Domain Model:

  We gebruiken een mongoose schema met de logic en validatie van de data, zodat de data in MongoDB altijd goed opgeslagen wordt en consistent is.

- Buy Rather Than Build:

  In plaats van een eigen login bouwen gaan we Google en LinkedIn SSO gebruiken. Ook gebruiken we een externe API voor boekeninformatie.

- Don't Reinvent the Wheel:

  We gebruiken voornamelijk Material UI (MUI)-componenten en bouwen alleen eigen componenten als het echt nodig is. We gebruiken dus ook alleen de styling via MUI en geen eigen geschreven CSS.

- Responsive Design:

  We gebruiken MUI-responsive componenten om te zorgen dat op zowel desktop en mobiel de applicatie goed te gebruiken is.

- Material-UI Theming:

  We maken gebruik van MUI theming om zo de huisstijl in de applicatie makkelijk te kunnen weergeven en wijzigen indien nodig.

- Client-Side Routing:

  we gebruiken React Router voor client-side routing, dit zorgt voor een vloeiende en dynamische ervaring voor de gebruiker. Hierdoor zijn er geen volledige pagina herladingen.

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

_body_

```json
{
  "name": String,
  "books": [{
    "_id": Number,
    "cover_image": String,
  }],
}
```

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

> **`PUT`** `/user/:username/shelves/:shelf`

Put a book to a shelf to a user

_parameters_

`:username` - Username in database.
`:shelf` - Shelf Id in database.

_body_

```json
{
  "book": {
    "_id": Number,
    "cover_image": String
  },
  "name": String,
  "books": [
    {
      "_id": Number,
      "cover_image": String
    }
  ],
  "type": String,
}
```

_returns_

```json
{
    "_id": Number,
    "cover_image": String,
}
```

> **`DELETE`** `/user/:username/shelves/:shelf`

Delete a shelf from a user

_parameters_

`:username` - Username in database.
`:shelf` - Shelf Id in database.

_returns_

```json
{
  String,
}
```

> **`DELETE`** `/user/:username/shelves/:shelf/book/:book`

Delete a book from a shelf from a user

_parameters_

`:username` - Username in database.
`:shelf` - Shelf Id in database.
`:book` - Book Id in database.

_returns_

```json
{
  String,
}
```

> **`DELETE`** `/user/:username/bookcase/:book`

Delete a book from a bookcase from a user

_parameters_

`:username` - Username in database.
`:book` - Book Id in database.

_returns_

```json
{
    String,
}
```

> **`PUT`** `/user/:username/bookcase/`

Put a book to a bookcase to a user

_parameters_

`:username` - Username in database.

_body_

```json
{
  "book": {
    "_id": Number,
    "cover_image": String,
  },
}
```

_returns_

```json
{
    "_id": Number,
    "cover_image": String,
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

> **`DELETE`** `/sessions/`

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
_id: { type: String, required: true, validate: [validatorUsername, "Username can only contain letters, numbers, dots and underscores "] },
sso_id: { type: String },
sso_provider: { type: String, enum: ["Google", "LinkedIn"] },
name: { type: String, required: true },
profile_picture: { type: String, required: true, default: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" },
top_three: {
  type: {
    name: { type: String },
    books: {
      type: [Book.schema],
            required: true,
    default: [],
            validate: [
        { validator: validatorUniqueBooks, message: "This book is already in the top three" },
        { validator: (val) => val.length <= 3, message: "Top three has a maximum of 3 books" },
      ],
    },
  },
  required: true,
default: { name: "My top three", books: [] },
},
shelf: {
  type: [
    {
      name: { type: String },
      books: {
        type: [Book.schema],
        validate: [
          { validator: (val) => val.length >= 3, message: "Must have a minimum of 3 books" },
          { validator: validatorUniqueBooks, message: "Can't have duplicates on a bookshelf" },
        ],
      },
    },
  ],
},
bookcase: { type: [Book.schema], required: true, default: [] },
},
{
  methods: {
    addToBookcase(books) {
      books.forEach((book) => {
        if (!this.bookcase.find((element) => element._id === book._id)) this.bookcase.push(book);
      });
    },
    deleteShelf(shelf) {
      this.shelf = this.shelf.filter((s) => s._id !== shelf);
    },
    removeFromBookcase(books) {
      books.forEach((book) => {
        const shelfBook = this.bookcase.find((element) => element._id === book._id);
        const index = this.bookcase.indexOf(shelfBook);
        if (index > -1) {
          this.bookcase.splice(index, 1);
        }
      });
    },
  },
```

## Book schema

Images of saved books of a user are saved in our database (from the external API), so the images are loaded easily and faster.

```js
_id: { type: String, required: true },
cover_image: { type: String },
title: { type: String, required: true },
authors: { type: [String], required: true },
```

# Domain terms

| **Term (NL)**  | **Term (EN)** | **Betekenis**                                                           | **Synoniemen**       |
| -------------- | ------------- | ----------------------------------------------------------------------- | -------------------- |
| Boekenplank    | Shelf         | Een verzameling van boeken, samengesteld door de gebruiker              | Collectie, categorie |
| Boekenkast     | Bookcase      | Een overzicht van alle boeken die een gebruiker in zijn account heeft   |                      |
| ISBN           | ISBN          | Uniek id nummer van een boek                                            |                      |
| Auteur         | Author        | Persoon die een boek heeft geschreven                                   |                      |
| Titel          | Title         | De naam van een boek                                                    | Naam                 |
| Favorieten     | Favorites     | Een speciale collectie met de favoriete boeken van een gebruiker        | Voorkeuren           |
| Suggestie      | Suggestions   | Suggesties voor boeken op basis van de opgeslagen boeken in een account | Aanbeveling, advies  |
| Delen          | Share         | Het kopiëren van een link naar een profielpagina                        |                      |
| Gebruikersnaam | Handle        | De naam van een gebruiker in de app                                     |                      |
