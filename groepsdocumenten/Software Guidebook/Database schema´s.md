## Database schema's

Wij gaan hierbij te werk met MongoDB

### User schema

```js
const schema = new mongoose.Schema({
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
});
```

### Book schema

Wij hebben ervoor gekozen om uit de externe boeken api de foto's wel in onze eigen database op te slaan, zodat de images gemakkelijk en snel geladen kunnen worden.

```js
const schema = new mongoose.Schema({
    _id: {type: String, required: true},
    cover_image: {type: String}
});
```