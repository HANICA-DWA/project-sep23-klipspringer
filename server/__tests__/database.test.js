"use strict";

import { it, test, before, after, beforeEach, afterEach, describe } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import User from "../model/user.js";

describe("connection", () => {
  before(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/TestBKS`);
  });

  after(async () => {
    await User.deleteOne({ _id: "jan" });
    await mongoose.disconnect();
  });

  describe("Bookcase Tests", () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "jan" });
      await User.create({
        _id: "jan",
        name: "Jan",
      });
    });

    // book is correctly added to bookcase
    it("AddingToBookcase", async () => {
      let user = await User.findById("jan");
      user.addToBookcase([{ _id: "123", cover_image: "image_url" }]);
      await user.save();
      let test_user = await User.findById("jan").lean();
      assert.deepEqual(test_user.bookcase, [{ _id: "123", cover_image: "image_url" }]);
    });
    // book is not added to bookcase if it is already in the bookcase
    it("AddingToBookcaseDuplicate", async () => {
      let user = await User.findById("jan");
      user.addToBookcase([{ _id: "123", cover_image: "image_url" }]);
      await user.save();

      user.addToBookcase([{ _id: "123", cover_image: "image_url" }]);
      await user.save();

      let test_user = await User.findById("jan").lean();
      assert.deepEqual(test_user.bookcase, [{ _id: "123", cover_image: "image_url" }]);
    });
  });
});
