import { it, test, before, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert';
import { createError } from "../functions/errorCreation.js";
import request from 'supertest';
import app from '../app.js';

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


// TODO getUserBySSOId


// TODO getUniqueId