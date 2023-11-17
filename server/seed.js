import mongoose from "mongoose";

import User from "./model/user.js";
import Book from "./model/book.js";

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
    await User.insertMany([{
        _id: "janwillem",
        name: "Jan Willem",
        profile_picture: "https://yt3.ggpht.com/yti/ADpuP3Pg_aDqzJqgvkj6wSF_s-1ERdm5tS9DEegXejKT=s88-c-k-c0x00ffffff-no-rj",
        top_three: [{
            _id: "9780140328721",
            cover_image: "https://covers.openlibrary.org/b/id/8739161-M.jpg"
        }],
        shelf: {
          books: [
            {
              _id: "9781338299205",
              cover_image: "https://covers.openlibrary.org/b/id/14453897-M.jpg"
            },
            {
              _id: "9781419748684",
              cover_image: "https://covers.openlibrary.org/b/id/10630557-M.jpg"
            },
            {
              _id: "9781897377758",
              cover_image: "https://covers.openlibrary.org/b/id/10787655-M.jpg"
            },
        ],
        name: "Aan te raden",
      },
    },
  ]);
};

main(console.log);
