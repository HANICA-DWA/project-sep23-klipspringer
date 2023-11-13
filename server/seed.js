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
    await Book.deleteMany();
    await Book.insertMany([{
        _id: "1",
        name: "Encyclopedie I"
    },
    {
        _id: "2",
        name: "Encyclopedie II"
    },
    {
        _id: "3",
        name: "Encyclopedie III"
    }]);

    await User.deleteMany();
    await User.insertMany([{
        _id: "10239123",
        name: "Jan Willem",
        username: "janwillem",
        profile_picture: "https://yt3.ggpht.com/yti/ADpuP3Pg_aDqzJqgvkj6wSF_s-1ERdm5tS9DEegXejKT=s88-c-k-c0x00ffffff-no-rj",
        top_three: [{
            _id: "1",
            name: "Encyclopedie I"
        }]
    }]);
}

main(console.log);
