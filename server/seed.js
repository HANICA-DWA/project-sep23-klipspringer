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
        top_three: [{
            _id: "1",
            name: "Encyclopedie I"
        }]
    }]);
}

main(console.log);
