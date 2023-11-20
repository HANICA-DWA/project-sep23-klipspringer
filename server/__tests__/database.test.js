'use strict'

import { test, before, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'

import mongoose from 'mongoose'

import User from '../model/user.js'

before(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/TestBKS`);
})

after(async () => {
    await mongoose.disconnect();
})

describe('Bookcase Tests', () => {
    beforeEach(async () => {
        await User.deleteMany();
        await User.create({
            _id: "janwillem",
            name: "Jan Willem",
        }
        );
    })

    // book is correctly added to bookcase
    test('AddingToBookcase', async () => {
        let user = await User.findById('janwillem');
        await user.addToBookcase([{_id: '123', cover_image: "image_url"}]);
        await user.save()
        let test_user = await User.findById('janwillem').lean();
        assert.deepEqual(test_user.bookcase, [{_id: '123', cover_image: "image_url"}]);
    })

    // book is not added to bookcase if it already exists
    // TODO test('AddingToBookcaseDuplicate', async () => {})
})