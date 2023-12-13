import mongoose from "mongoose";

import User from "./model/user.js";
import Book from "./model/book.js";
import Genre from "./model/genre.js";

const main = async ($log) => {
  $log("> connecting");
  const db = await mongoose.connect(`mongodb://127.0.0.1:27017/BKS`);
  $log("> connected");

  try {
    $log("> seeding");
    await seed();
  } catch (e) {
    $log(e);
  } finally {
    await db.disconnect();
    $log("> done");
  }
};

const seed = async () => {
  await User.deleteMany();
  await User.insertMany([
    {
      _id: "janwillem",
      name: "Jan Willem",
      profile_picture: "https://yt3.ggpht.com/yti/ADpuP3Pg_aDqzJqgvkj6wSF_s-1ERdm5tS9DEegXejKT=s88-c-k-c0x00ffffff-no-rj",
      top_three: {
        books: [
          {
            _id: "9780140328721",
            cover_image: "https://covers.openlibrary.org/b/id/8739161-M.jpg",
            title: "Book1",
            authors: ["author"],
          },
        ],
      },
      shelf: {
        books: [
          {
            _id: "9781338299205",
            cover_image: "https://covers.openlibrary.org/b/id/14453897-M.jpg",
            title: "Book1",
            authors: ["author"],
          },
          {
            _id: "9781419748684",
            cover_image: "https://covers.openlibrary.org/b/id/10630557-M.jpg",
            title: "Book1",
            authors: ["author"],
          },
          {
            _id: "9781897377758",
            cover_image: "https://covers.openlibrary.org/b/id/10787655-M.jpg",
            title: "Book1",
            authors: ["author"],
          },
        ],
        name: "Aan te raden",
      },
      bookcase: [],
    },
  ]);
  await Genre.deleteMany();
  await Genre.insertMany([
    {  
      _id: "Nonfiction",
      subgenres: [
        {_id: "Memoir And Autobiography"},
        {_id: "Biography"},
        {_id: "Food And Drink"},
        {_id: "Art And Photography"},
        {_id: "Self-help"},
        {_id: "History"},
        {_id: "Travel"},
        {_id: "True Crime"},
        {_id: "Humor"},
        {_id: "Essays"},
        {_id: "Guide / How-to "},
        {_id: "Religion And Spirituality"},
        {_id: "Humanities And Social Sciences"},
        {_id: "Parenting And Families"},
        {_id: "Science And Technology"},
      ]
    },
    {
      "_id": "Fiction",
      "subgenres": [
        {_id: "Fantasy"},
        {_id: "Science Fiction"},
        {_id: "Dystopian"},
        {_id: "Action And Adventure"},
        {_id: "Mystery"},
        {_id: "Horror"},
        {_id: "Thriller And Suspense"},
        {_id: "Historical Fiction"},
        {_id: "Romance"},
        {_id: "Women’s Fiction"},
        {_id: "LGBTQ+"},
        {_id: "Contemporary Fiction"},
        {_id: "Literary Fiction"},
        {_id: "Magical Realism"},
        {_id: "Graphic Novel"},
        {_id: "Short Story"},
        {_id: "Young Adult"},
        {_id: "New Adult"},
        {_id: "Children’s"},
      ]
    }
  ])
};

main(console.log);
