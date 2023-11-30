import dotenv from "dotenv";
dotenv.config();

export const mongoServer = process.env.MONGO_HOST || "mongodb://127.0.0.1:27017";
