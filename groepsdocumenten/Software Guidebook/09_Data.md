# Data

Als dataopslag wordt MongoDB gebruikt. Dit is een NoSQL document based database. Documenten worden hier in het JSON-format opgeslagen. Bij gebruik van een cloud database kunnen er automatisch backups worden gemaakt om de data te beschermen.
De hoeveelheid opslag die nodig is, is van tevoren lastig te bepalen. Dit zou afhankelijk zijn van het aantal gebruikers dat de webapplicatie krijgt. MongoDB heeft een maximum van 16MB per document. Aangezien hier enkel tekst opgeslagen wordt, zal dit maximum niet snel worden bereikt.
Mongoose wordt gebruikt voor de connectie vanuit de backend met de datbase. Hiervoor zijn de volgende mongoose schema's gemaakt als datamodel.

### User schema

Dit schema is bedoeld voor het opslaan van gebruikers. Er is gekozen om te embedden in dit schema. De voordelen van NoSQL worden hierbij benut, door onnodige referenties te vermijden waar kan.

```js
 {
    _id: { type: String, required: true},
    sso_id: { type: String },
    sso_provider: { type: String, enum: ["Google", "LinkedIn"] },
    name: { type: String, required: true },
    profile_picture: { type: String, required: true},
    top_three: {
      type: {
        name: { type: String},
        books: {
          type: [Book.schema],
          required: true,
        },
      },
      required: true,
    },
    shelf: {
      type: [
        {
          name: { type: String },
          books: {
            type: [Book.schema]
          },
        },
      ],
    },
    bookcase: { type: [Book.schema], required: true},
  }
```

### Book schema

Op verschillende plekken in de user schema wordt gebruikt gemaakt van het type van book schema. Deze is hieronder te zien.

```js
{
  _id: { type: String, required: true },
  cover_image: { type: String },
  title: { type: String, required: true },
  authors: { type: [String], required: true },
}
```