import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import AuthRoutes from './routes/AuthRoutes.js';
import mongoDBConnect from './mongoDB/config/db.js';
import corsOptions from './mongoDB/config/corsSetup.js';
import UserRoutes from './routes/UserRoutes.js';
import postRouter from './routes/PostRoutes.js';
import commentRouter from './routes/CommentRoutes.js';

// dotenv configure
dotenv.config();

// environment vars
const PORT = process.env.PORT || 5000;

// init express
const app = express();

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('*', cors(corsOptions));

// set static folder
app.use(express.static('public'));

app.use(cookieParser());

// init router
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);

app.listen(PORT, async () => {
  await mongoDBConnect();
  console.log(`Server is running on port ${PORT}`.bgBlue);
});
