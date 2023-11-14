## REST API

### User

> **`GET`** `/user/:username`

Get a specific user's data.

_parameters_

`:username` - Username in database.

_query\_parameters_

`fields` - Array of fields that the request wants.

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

### Book

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