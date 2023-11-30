import { it, test, before, after, beforeEach, describe } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app, { server } from "../app.js";
import mongoose from "mongoose";
import User from "../model/user.js";
import Book from "../model/book.js";

describe("connection", () => {
  before(async () => {
    //await mongoose.connect(`mongodb://127.0.0.1:27017/TestBKS`)
  });

  after(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
    await server.close();
    console.log("finished")
  });

  // TODO fetch("/book/:id")
  describe("GET /book/:id", { skip: false }, () => {
    beforeEach(async () => {
      await Book.deleteMany();
      await Book.create({
        _id: "1234567890123",
        cover_image: "https://covers.openlibrary.org/b/id/9561870-M.jpg",
        title: "hoi",
        authors: [],
      });
    });

    it("status 200 with cover from book via isbn (stored)", async () => {
      const res = await request(app).get("/book/1234567890123").expect(200);

      const obj = res.body;
      assert.deepEqual(obj, { __v: 0, _id: 1234567890123, cover_image: "https://covers.openlibrary.org/b/id/9561870-M.jpg",
      title: "hoi",
      authors: [], });
    });

    it("status 200 with cover from book via isbn (fetched)", async () => {
      const res = await request(app).get("/book/9783125737600").expect(200);

      const obj = res.body;
      assert.deepEqual(obj, { _id: 9783125737600, 
        cover_image: "https://covers.openlibrary.org/b/id/9472783-M.jpg", title: "Charlie and the Chocolate Factory", authors: [] });
    });

    it("status 400 with cover from book via isbn (fetched)", async () => {
      const res = await request(app).get("/book/INVALID").expect(400);

      const obj = res.body;
      assert.deepEqual(obj, {
        error: "Book not in external API",
      });
    });
  });

  describe("HEAD /user/check/:username", { skip: false }, () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "janwillem" });
      await User.create({
        _id: "janwillem",
        name: "Jan Willem",
        profile_picture: "hallo",
      });
    })

    it("Status 200", async () => {
      await request(app)
        .head("/user/check/henk")
        .expect(200);
    })

    it("Status 403", async () => {
      await request(app)
        .head("/user/check/janwillem")
        .expect(403);
    })

    it("Status 403", async () => {
      await request(app)
        .head("/user/check/login")
        .expect(403);
    })
  })

  describe("GET /user/", { skip: false }, () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "janwillem" });
      await User.create({
        _id: "janwillem",
        name: "Jan Willem",
        profile_picture: "hallo",
      });
    });

    it("Status 200 with list of usernames", async () => {
      const res = await request(app)
        .get("/user/?" + new URLSearchParams({ q: "janw" }))
        .expect(200);

      assert.deepEqual(res.body, [{ _id: "janwillem", profile_picture: "hallo" }]);
    });
  });

  // TODO fetch("/user/:username")
  describe("GET /user/:username", { skip: false }, () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "janwillem" });
      await User.create({
        _id: "janwillem",
        name: "Jan Willem",
      });
    });

    it("status 200 with profile data from user", async () => {
      const res = await request(app)
        .get("/user/janwillem?" + new URLSearchParams({ fields: ["_id", "profile_picture", "name", "top_three", "shelf"] }))
        .expect(200);

      const obj = res.body;
      assert.deepEqual(obj, {
        _id: "janwillem",
        profile_picture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        name: "Jan Willem",
        top_three: { name: "My top three", books: [] },
        shelf: [],
      });
    });

    it("status 400 with specify fields", async () => {
      const res = await request(app).get("/user/janwillem").expect(400);

      const obj = res.body;
      assert.deepEqual(obj, {
        error: "Specify fields",
      });
    });

    it("status 404 with user not found", async () => {
      const res = await request(app)
        .get("/user/nonexistinguser?" + new URLSearchParams({ fields: ["_id", "profile_picture", "name", "top_three", "shelf"] }))
        .expect(404);

      const obj = res.body;
      assert.deepEqual(obj, {
        error: "User not found",
      });
    });
  });

  // TODO fetch("/user/:username/shelf")
  describe("POST /user/:username/shelf", { skip: false }, () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "janwillem" });
      await User.create({
        _id: "janwillem",
        name: "Jan Willem",
        shelf: [],
      });
    });

    it("should add a book to the user's shelf and return 201 status", async () => {
      const username = "janwillem";
      const bookData = {
        name: "test",
        books: [
          {
            _id: "123456789",
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
          {
            _id: "324567890",
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
          {
            _id: "799754332",
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
        ],
      };

      const res = await request(app).post(`/user/${username}/shelf`).send(bookData).expect(201);

      assert.deepStrictEqual(res.body, bookData);
    });

    it("should return a 404 status if the user is not found", async () => {
      const username = "nonexistentuser";
      const bookData = {
        name: "test",
        books: [
          {
            _id: "123456789",
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
          {
            _id: "324567890",
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
          {
            _id: "799754332",
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
        ],
      };

      await request(app).post(`/user/${username}/shelf`).send(bookData).expect(404);
    });

    it("should handle validation errors and return a 400 status", async () => {
      // Simulate a validation error scenario
      const username = "janwillem";
      const bookData = {
        name: "test",
        books: [
          {
            cover_image: "url1",
            title: "hoi",
            authors: [],
          },
          {
            cover_image: "url2",
            title: "hoi",
            authors: [],
          },
          {
            cover_image: "url3",
            title: "hoi",
            authors: [],
          },
        ],
      };

      await request(app).post(`/user/${username}/shelf`).send(bookData).expect(400);
    });

    it("should handle validation errors and return a 400 status, no duplicates", async () => {
      // Simulate a validation error scenario
      const username = "janwillem";
      const bookData = {
        name: "test",
        books: [
          {
            _id: 1,
            cover_image: "url1",
            title: "hoi",
            authors: [],
          },
          {
            _id: 1,
            cover_image: "url2",
            title: "hoi",
            authors: [],
          },
          {
            _id: 2,
            cover_image: "url3",
            title: "hoi",
            authors: [],
          },
        ],
      };

      const res = await request(app).post(`/user/${username}/shelf`).send(bookData).expect(400);
      assert.deepEqual(res.body, { error: "Can't have duplicates on a bookshelf" });
    });

    it("should handle validation errors and return a 400 status, minimum of 3", async () => {
      // Simulate a validation error scenario
      const username = "janwillem";
      const bookData = {
        name: "test",
        books: [
          {
            _id: 1,
            cover_image: "url1",
            title: "hoi",
            authors: [],
          },
          {
            _id: 1,
            cover_image: "url2",
            title: "hoi",
            authors: [],
          },
        ],
      };

      const res = await request(app).post(`/user/${username}/shelf`).send(bookData).expect(400);
      assert.deepEqual(res.body, { error: "Must have a minimum of 3 books" });
    });
  });

  // TODO fetch("/user/:username/shelves/:shelf")
  describe("PUT /user/:username/shelves/:shelf", { skip: false }, () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "janwillem" });
      await User.create({
        _id: "janwillem",
        name: "Jan Willem",
        shelf: [
          {
            _id: "655b323165c31f3c397b6753",
            name: "hallo",
            books: [
              {
                _id: 123,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
              {
                _id: 321,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
              {
                _id: 132,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
            ],
          },
        ],
      });
    });

    it("Regular PUT on shelf", async () => {
      const username = "janwillem";
      const shelfId = "655b323165c31f3c397b6753";

      const res = await request(app)
        .put(`/user/${username}/shelves/${shelfId}`)
        .send({ book: { _id: "4321", cover_image: "myimage",
      title: "hoi",
    authors: [], } })
        .set("Content-Type", "application/json")
        .expect(200);

      assert.deepEqual(res.body, { _id: "4321", cover_image: "myimage",
    title: "hoi",
  authors: [], });
    });

    it("Empty body", async () => {
      const username = "janwillem";
      const shelfId = "655b323165c31f3c397b6753";

      const res = await request(app).put(`/user/${username}/shelves/${shelfId}`).expect(400);

      assert.deepEqual(res.body, { error: "Missing request body" });
    });

    it("PUT on non existent shelf", async () => {
      const username = "janwillem";
      const shelfId = "655b323165c31f3c397b6754";

      const res = await request(app)
        .put(`/user/${username}/shelves/${shelfId}`)
        .send({book: { _id: "4321", cover_image: "myimage",
      title: "hoi",
    authors: [], } })
        .set("Content-Type", "application/json")
        .expect(400);

      assert.deepEqual(res.body, { error: "Invalid book or shelf" });
    });

    it("PUT on top_three", async () => {
      const username = "janwillem";
      const shelfId = "top_three";

      const res = await request(app)
        .put(`/user/${username}/shelves/${shelfId}`)
        .send({ book: { _id: "4321", cover_image: "myimage",
      title: "hoi",
    authors: [], } })
        .set("Content-Type", "application/json")
        .expect(200);

      assert.deepEqual(res.body, { _id: "4321", cover_image: "myimage",
    title: "hoi",
  authors: [], });
    });
  });

  describe("DELETE /user/:username/shelves/:shelf", { skip: false }, async () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "unittester" });
      await User.create({
        _id: "unittester",
        name: "Jan Willem",
        shelf: [
          {
            _id: "655b323165c31f3c397b6753",
            name: "hallo",
            books: [
              {
                _id: 123,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
              {
                _id: 321,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
              {
                _id: 132,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
            ],
          },
        ],
      });
    });

    it("Should delete the shelf", async () => {
      const res = await request(app)
        .delete("/user/unittester/shelves/655b323165c31f3c397b6753")
        .expect(200);

      assert.deepEqual(res.body, "Shelf deleted succesfully");
      const user = await User.findById("unittester").lean();
      assert.deepEqual(user.shelf, []);
    })

    it("Should give a 404 with invalid shelf", async () => {
      const res = await request(app)
        .delete("/user/unittester/shelves/655b323165c31f3c397b6754")
        .expect(404);

      assert.deepEqual(res.body, { error: "Shelf not found" })
    })
  })
  
  describe("DELETE /:username/shelves/:shelf/book/:book", { skip: false }, async () => {
    before(async () => {
      await User.deleteOne({ _id: "unittester2" });
      await User.create({
        _id: "unittester2",
        name: "Jan Willem",
        top_three: [
          {
            _id: 123,
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
          {
            _id: 321,
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
          {
            _id: 132,
            cover_image: "url",
            title: "hoi",
            authors: [],
          }
        ],
        shelf: [
          {
            _id: "655b323165c31f3c397b6753",
            name: "hallo",
            books: [
              {
                _id: 123,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
              {
                _id: 321,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
              {
                _id: 132,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
              {
                _id: 133,
                cover_image: "url",
                title: "hoi",
                authors: [],
              },
            ],
          },
        ],
      });
    })

    it("Should delete the book from the top_three shelf", async () => {
      const res = await request(app)
        .delete("/user/unittester2/shelves/top_three/book/132")
        .expect(200);

      assert.deepEqual(res.body, '132')

      const user = await User.findById("unittester2").lean();
      assert.deepEqual(user.top_three, [
        {
          _id: 123,
          cover_image: "url",
          title: "hoi",
          authors: [],
        },
        {
          _id: 321,
          cover_image: "url",
          title: "hoi",
          authors: [],
        },
      ]);
    })

    it("Should delete the book from the shelf", async () => {
      const res = await request(app)
        .delete("/user/unittester2/shelves/655b323165c31f3c397b6753/book/132")
        .expect(200);

      assert.deepEqual(res.body, '132')

      const user = await User.findById("unittester2").lean();
      assert.deepEqual(user.shelf, [
        {
          _id: new mongoose.Types.ObjectId("655b323165c31f3c397b6753"),
          name: "hallo",
          books: [
            {
              _id: 123,
              cover_image: "url",
              title: "hoi",
              authors: [],
            },
            {
              _id: 321,
              cover_image: "url",
              title: "hoi",
              authors: [],
            },
            {
              _id: 133,
              cover_image: "url",
              title: "hoi",
              authors: [],
            },
          ],
        },
      ]);
    })

    it("Should return a 404 on invalid shelf", async () => {
      const res = await request(app)
        .delete("/user/unittester2/shelves/doesnt_exist/book/132")
        .expect(404);

      assert.deepEqual(res.body, { error: "Shelf not found" });
    })
  });
});
