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
