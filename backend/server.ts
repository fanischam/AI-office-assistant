import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

connectDB();

const app = express();

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
