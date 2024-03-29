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
    console.log("finished");
  });

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
      assert.deepEqual(obj, {
        __v: 0,
        _id: 1234567890123,
        cover_image: "https://covers.openlibrary.org/b/id/9561870-M.jpg",
        title: "hoi",
        authors: [],
      });
    });

    it("status 200 with cover from book via isbn (fetched)", async () => {
      const res = await request(app).get("/book/9783125737600").expect(200);

      const obj = res.body;
      assert.deepEqual(obj, {
        _id: 9783125737600,
        cover_image: "https://covers.openlibrary.org/b/id/9472783-M.jpg",
        title: "Charlie and the Chocolate Factory",
        authors: [],
      });
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
    });

    it("Status 200", async () => {
      await request(app).head("/user/check/henk").expect(200);
    });

    it("Status 403", async () => {
      await request(app).head("/user/check/janwillem").expect(403);
    });

    it("Status 403", async () => {
      await request(app).head("/user/check/login").expect(403);
    });
  });

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
      delete obj.top_three._id;
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
      delete res.body._id;

      assert.deepStrictEqual(res.body, { ...bookData, bookcase: bookData.books });
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

  describe("PUT /user/:username/shelves/:shelf", { skip: false }, () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "janwillem" });
      await User.create({
        _id: "janwillem",
        name: "Jan Willem",
        top_three: {
          _id: "655b323165c31f3c397b6754",
          name: "My top three",
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
          ],
        },
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

    it("Put on top_three shelf", async () => {
      await request(app)
        .put("/user/janwillem/shelves/top_three")
        .send({
          name: "My top three",
          books: [
            {
              _id: 132,
              cover_image: "url",
              title: "hoi",
              authors: [],
            },
          ],
          type: "editshelf",
        })
        .expect(200);

      const user = await User.findById("janwillem").lean();
      assert.deepEqual(user.top_three, {
        name: "My top three",
        _id: new mongoose.Types.ObjectId("655b323165c31f3c397b6754"),
        books: [
          {
            _id: 132,
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
        ],
      });
    });

    it("Regular PUT on shelf", async () => {
      const username = "janwillem";
      const shelfId = "655b323165c31f3c397b6753";
      const bookToAdd = { _id: "4321", cover_image: "myimage", title: "hoi", authors: [] };

      const userBeforePut = await User.findById("janwillem").lean();
      const res = await request(app)
        .put(`/user/${username}/shelves/${shelfId}`)
        .send({ book: bookToAdd })
        .set("Content-Type", "application/json")
        .expect(200);

      const bookcase = [bookToAdd];
      const shelf = {
        _id: "655b323165c31f3c397b6753",
        name: "hallo",
        books: [...userBeforePut.shelf.find((e) => e._id == shelfId).books, bookToAdd],
      };

      assert.deepEqual(res.body, { shelf, bookcase });
    });

    it("PUT on shelf with array", async () => {
      const username = "janwillem";
      const shelfId = "655b323165c31f3c397b6753";
      const booksToAdd = [{ _id: "4321", cover_image: "myimage", title: "hoi", authors: [] }];

      const userBeforePut = await User.findById("janwillem").lean();
      const res = await request(app)
        .put(`/user/${username}/shelves/${shelfId}`)
        .send({ book: booksToAdd })
        .set("Content-Type", "application/json")
        .expect(200);

      const bookcase = [...booksToAdd];
      const shelf = {
        _id: "655b323165c31f3c397b6753",
        name: "hallo",
        books: [...userBeforePut.shelf.find((e) => e._id == shelfId).books, ...booksToAdd],
      };

      assert.deepEqual(res.body, { shelf, bookcase });
    });

    it("PUT on top three shelf with array", async () => {
      const username = "janwillem";
      const shelfId = "top_three";
      const booksToAdd = [{ _id: "4321", cover_image: "myimage", title: "hoi", authors: [] }];

      const userBeforePut = await User.findById("janwillem").lean();
      const res = await request(app)
        .put(`/user/${username}/shelves/${shelfId}`)
        .send({ book: booksToAdd })
        .set("Content-Type", "application/json")
        .expect(200);

      const bookcase = [...booksToAdd];
      const shelf = {
        _id: "655b323165c31f3c397b6754",
        name: "My top three",
        books: [...userBeforePut.top_three.books, ...booksToAdd],
      };

      assert.deepEqual(res.body, { shelf, bookcase });
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
        .send({ book: { _id: "4321", cover_image: "myimage", title: "hoi", authors: [] } })
        .set("Content-Type", "application/json")
        .expect(400);

      assert.deepEqual(res.body, { error: "Invalid book or shelf" });
    });

    it("PUT duplicate on shelf", async () => {
      const username = "janwillem";
      const shelfId = "655b323165c31f3c397b6753";

      const res = await request(app)
        .put(`/user/${username}/shelves/${shelfId}`)
        .send({
          book: {
            _id: 123,
            cover_image: "url",
            title: "hoi",
            authors: [],
          },
        })
        .set("Content-Type", "application/json")
        .expect(400);

      assert.deepEqual(res.body, { error: "Can't have duplicates on a bookshelf" });
    });

    it("PUT on top_three", async () => {
      const username = "janwillem";
      const shelfId = "top_three";
      const bookToAdd = { _id: "4321", cover_image: "myimage", title: "hoi", authors: [] };

      const userBeforePut = await User.findById("janwillem").lean();
      const res = await request(app)
        .put(`/user/${username}/shelves/${shelfId}`)
        .send({ book: bookToAdd })
        .set("Content-Type", "application/json")
        .expect(200);

      const bookcase = [bookToAdd];
      const topThree = {
        _id: "655b323165c31f3c397b6754",
        name: "My top three",
        books: [...userBeforePut.top_three.books, bookToAdd],
      };

      assert.deepEqual(res.body, { bookcase, shelf: topThree });
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
      const res = await request(app).delete("/user/unittester/shelves/655b323165c31f3c397b6753").expect(200);

      assert.deepEqual(res.body, "Shelf deleted succesfully");
      const user = await User.findById("unittester").lean();
      assert.deepEqual(user.shelf, []);
    });

    it("Should give a 404 with invalid shelf", async () => {
      const res = await request(app).delete("/user/unittester/shelves/655b323165c31f3c397b6754").expect(404);

      assert.deepEqual(res.body, { error: "Shelf not found" });
    });
  });

  describe("DELETE /:username/shelves/:shelf/book/:book", { skip: false }, async () => {
    before(async () => {
      await User.deleteOne({ _id: "unittester2" });
      await User.create({
        _id: "unittester2",
        name: "Jan Willem",
        top_three: {
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
    });

    it("Should delete the book from the top_three shelf", async () => {
      const res = await request(app).delete("/user/unittester2/shelves/top_three/book/132").expect(200);

      assert.deepEqual(res.body, "132");

      const user = await User.findById("unittester2").lean();
      delete user.top_three._id;
      assert.deepEqual(user.top_three, {
        name: "My top three",
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
        ],
      });
    });

    it("Should delete the book from the shelf", async () => {
      const res = await request(app).delete("/user/unittester2/shelves/655b323165c31f3c397b6753/book/132").expect(200);

      assert.deepEqual(res.body, "132");

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
    });

    it("Should return a 404 on invalid shelf", async () => {
      const res = await request(app).delete("/user/unittester2/shelves/doesnt_exist/book/132").expect(404);

      assert.deepEqual(res.body, { error: "Shelf not found" });
    });
  });

  describe("DELETE /user/:username/bookcase/:book", async () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "unittester2" });
      await User.create({
        _id: "unittester2",
        name: "Jan Willem",
        bookcase: [
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
        ]
      })
    })

    it("Should delete book with status 200", async () => {
      await request(app)
        .delete("/user/unittester2/bookcase/133")
        .expect(200)

      const data = await User.findById("unittester2").lean();
      assert.deepEqual(data.bookcase, [{
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
      }])
    })

    it("Should error with status 404", async () => {
      const res = await request(app)
        .delete("/user/unittester2/bookcase/undefined")
        .expect(404);

      assert.deepEqual(res.body, { error: "Specified book does not exist" })
    })
  })

  describe("PUT /user/:username/bookcase", async () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "unittester2" });
      await User.create({
        _id: "unittester2",
        name: "Jan Willem",
        bookcase: [
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
        ]
      })
    })

    it("Should put a book on bookcase status 200", async () => {
      const res = await request(app)
        .put("/user/unittester2/bookcase")
        .send({
          book: {
            _id: 134,
            cover_image: "url",
            title: "hoi",
            authors: [],
          }
        })
        .expect(200);

      assert.deepEqual(res.body, {
        _id: 134,
        cover_image: "url",
        title: "hoi",
        authors: [],
      })

      let user = await User.findById("unittester2").lean();
      assert.deepEqual(user.bookcase, [
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
        {
          _id: 134,
          cover_image: "url",
          title: "hoi",
          authors: [],
        }
      ])
    })

    it("Should error on non book", async () => {
      await request(app)
        .put("/user/unittester2/bookcase")
        .send({ book: "geen boek" })
        .expect(400);
    })
  })

  describe("PATCH /:username", () => {
    beforeEach(async () => {
      await User.deleteOne({ _id: "janwillem" });
      await User.create({
        _id: "janwillem",
        name: "Jan Willem",
        profile_picture: "https://yt3.ggpht.com/yti/ADpuP3Pg_aDqzJqgvkj6wSF_s-1ERdm5tS9DEegXejKT=s88-c-k-c0x00ffffff-no-rj",
      });
    })

    it("Succesfully updates profile with name and picture", async () => {
      await request(app)
        .patch("/user/janwillem")
        .send({ name: "pietje", image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" })
        .expect(200)
    })

    it("should get error with name required", async () => {
      const res = await request(app)
        .patch("/user/janwillem")
        .send({image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"})
        .expect(400)
        
        assert.deepEqual(res.body, {error: "Name is required"});
    })
  })

  describe("PUT /:username/follow", () => {
    beforeEach(async () => {
      await User.deleteMany();
      await User.create({
        _id: "test1",
        name: "Jan Willem",
        following: [{_id: "duplicate", name: "duplicate following"}]
      });

      await User.create({
        _id: "test2",
        name: "Jan Willem",
        profile_picture: "hoi"
      });

      await User.create({
        _id: "duplicate",
        name: "duplicate following"
      })
    })

    it("Should follow and give code 200", async () => {
      const res = await request(app)
        .put("/user/test1/follow")
        .send({ account: "test2" })
        .expect(200);

      assert.deepEqual(res.body, 
        {
          _id: 'test2',
          profile_picture: 'hoi'
        }
      );
      const user1 = await User.findById("test2").lean();
      assert.deepEqual(user1.followers, [{ _id: "test1", profile_picture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" }])

      const user2 = await User.findById("test1").lean();
      assert.deepEqual(user2.following, [{ _id: "duplicate" }, { _id: "test2", profile_picture: "hoi" }])
    })

    it("Should not find the user and error 400", async () => {
      const res = await request(app)
        .put("/user/test1/follow")
        .send({account: "test3"})
        .expect(400);

      assert.deepEqual(res.body, { error: "Cannot follow, maybe user doesnt exist"})
    })

    it("Should not follow already following and error 400", async () => {
      const res = await request(app)
        .put("/user/test1/follow")
        .send({ account: "duplicate" })
        .expect(400);

      assert.deepEqual(res.body, { error: "Can't have duplicate following" }
      );
    })
  })

  describe("DELETE /:username/unfollow", () => {
    beforeEach(async () => {
      await User.deleteMany();
      await User.create({
        _id: "test1",
        name: "Jan Willem",
        following: [
          {
            _id: "test2",
            profile_picture: "hoi"
          }
        ]
      });

      await User.create({
        _id: "test2",
        name: "Jan Willem",
        profile_picture: "hoi"
      });
    })

    it("Should unfollow test2 and 200.", async () => {
      await request(app)
        .delete("/user/test1/unfollow")
        .send({ account: "test2" })
        .expect(200);
      
      const user = await User.findById("test1").lean();
      assert.deepEqual(user.following, [])
    })

    it("Should unfollow test3 and 400.", async () => {
      const res = await request(app)
        .delete("/user/test2/unfollow")
        .send({ account: "test3" })
        .expect(400);
      
      assert.deepEqual(res.body, { error: "Cannot unfollow, maybe user doesnt exist" })
    })
  })

  describe("GET genre", () => {
    it("return array with all genres", async () => {
      const res = await request(app)
        .get("/genre/")
        .expect(200);
    })
  })
});
