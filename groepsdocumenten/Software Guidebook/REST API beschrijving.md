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
