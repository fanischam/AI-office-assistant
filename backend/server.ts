import express from 'express';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
dotenv.config();

const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
