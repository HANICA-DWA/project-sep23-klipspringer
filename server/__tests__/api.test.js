import { it, test, before, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert';
import request from 'supertest';
import app, {server} from '../app.js';
import mongoose from 'mongoose'
import User from '../model/user.js'
import Book from '../model/book.js'



describe("connection", () => {
    before(async () => {
        //await mongoose.connect(`mongodb://127.0.0.1:27017/TestBKS`)
    })

    after(async () => {
        await server.close()
        await mongoose.disconnect();
    })


    // TODO fetch("/book/:id")
    describe('GET /book/:id', () => {
        beforeEach(async () => {
            await Book.deleteMany();
            await Book.create({
                _id: "1234567890123",
                cover_image: "https://covers.openlibrary.org/b/id/9561870-M.jpg"
            });
        })

        it('status 200 with cover from book via isbn', async () => {
            const res = await request(app)
                .get('/book/1234567890123')
                .expect(200)

            const obj = res.body
            assert.deepEqual(obj, { __v: 0, _id: 1234567890123, cover_image: "https://covers.openlibrary.org/b/id/9561870-M.jpg" });
        })
    })

    // TODO fetch("/user/:username")
    describe('GET /user/:username', () => {
        beforeEach(async () => {
            await User.deleteMany();
            await User.create({
                _id: "janwillem",
                name: "Jan Willem",
            }
            );
        })

        it('status 200 with profile data from user', async () => {
            const res = await request(app)
                .get('/user/janwillem?' + new URLSearchParams({ fields: ["_id", "profile_picture", "name", "top_three", "shelf"], }))
                .expect(200)

            const obj = res.body;
            assert.deepEqual(obj, {
                _id: "janwillem",
                profile_picture: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
                name: "Jan Willem",
                top_three: [],
                shelf: []
            })
        });
    })


    // TODO fetch("/user/:username/shelf")
    describe('POST /:username/shelf', () => {
        beforeEach(async () => {
            await User.deleteMany();
            await User.create({
                _id: "janwillem",
                name: "Jan Willem",
                shelf: []
            }
            );
        })

        it('should add a book to the user\'s shelf and return 201 status', async () => {
            const username = "janwillem";
            const bookData = {
                name: "test",
                books: [
                    {
                        _id: "123456789",
                        cover_image: "url"
                    },
                    {
                        _id: "324567890",
                        cover_image: "url"
                    },
                    {
                        _id: "799754332",
                        cover_image: "url"
                    }]
            };

            const res = await request(app)
                .post(`/user/${username}/shelf`)
                .send(bookData)
                .expect(201);

            assert.deepStrictEqual(res.body, bookData);


        });

        it('should return a 404 status if the user is not found', async () => {
            const username = 'nonexistentuser';
            const bookData = {
                name: "test",
                books: [
                    {
                        _id: "123456789",
                        cover_image: "url"
                    },
                    {
                        _id: "324567890",
                        cover_image: "url"
                    },
                    {
                        _id: "799754332",
                        cover_image: "url"
                    }]
            };

            await request(app)
                .post(`/user/${username}/shelf`)
                .send(bookData)
                .expect(404);
        });

        it('should handle validation errors and return a 400 status', async () => {
            // Simulate a validation error scenario
            const username = 'janwillem';
            const bookData = {
                name: "test",
                books: [
                    {
                        cover_image: "url"
                    },
                    {
                        cover_image: "url"
                    },
                    {
                        cover_image: "url"
                    }]
            };

            await request(app)
                .post(`/user/${username}/shelf`)
                .send(bookData)
                .expect(400);
        });
    });


    // TODO fetch("/user/:username/shelves/:shelf")
    describe('PUT /user/:username/shelves/:shelf', () => {
        beforeEach(async () => {
            await User.deleteMany();
            await User.create({
                _id: "janwillem",
                name: "Jan Willem",
                shelf: [{
                    _id: '655b323165c31f3c397b6753',
                    name: "hallo",
                    books: [{
                        _id: 123,
                        cover_image: "url"
                    }, {
                        _id: 321,
                        cover_image: "url"
                    }, {
                        _id: 132,
                        cover_image: "url"
                    }]
                }]
            });
        })

        it('Regular PUT on shelf', async () => {
            const username = "janwillem";
            const shelfId = '655b323165c31f3c397b6753';

            const res = await request(app)
                .put(`/user/${username}/shelves/${shelfId}`)
                .send({ book: { _id: "4321", cover_image: "myimage" } })
                .set('Content-Type', 'application/json')
                .expect(200)

            assert.deepEqual(res.body, { _id: "4321", cover_image: "myimage" })
            console.log("test");
        })
    })
})
