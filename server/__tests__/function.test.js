import { it, test, before, after, beforeEach, describe, afterEach } from 'node:test'
import assert from 'node:assert';
import { createError } from "../functions/errorCreation.js";
import { getUserByUsername } from '../functions/users.js';
import mongoose from 'mongoose'
import User from '../model/user.js'
import request from 'supertest';
import app from '../app.js';


describe("connection", () => {


    before(async () => {
        await mongoose.connect(`mongodb://127.0.0.1:27017/TestBKS`)

    })

    after(async () => {
        await mongoose.disconnect();
    })

    // TODO createError
    describe('createError function', () => {
        it('should create an error with default message and status', () => {
            const defaultError = createError();
            assert.strictEqual(defaultError.message, 'Something went wrong');
            assert.strictEqual(defaultError.status, 500);
        });

        it('should create an error with custom message and status', () => {
            const customError = createError('Custom error message', 404);
            assert.strictEqual(customError.message, 'Custom error message');
            assert.strictEqual(customError.status, 404);
        });
    });

    // TODO getUserByUsername
    describe('getUserByUsername function', () => {
        beforeEach(async () => {
            await User.deleteMany();
            await User.create({
                _id: "janwillem",
                name: "Jan Willem",
            });

        })

        it("Should get the user information", async () => {
            const username = "janwillem"

            const userInfo = await getUserByUsername(username)
            assert.strictEqual(userInfo._id, username)
        })

        it("Should get null", async () => {
            const username = "doesnotExist"

            const userInfo = await getUserByUsername(username)
            assert.strictEqual(userInfo, null)
        })

    })


    // TODO getUserBySSOId


    // TODO getUniqueId

})