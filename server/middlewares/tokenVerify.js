import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../mongoDB/models/User.js';

// Verify Token
const tokenVerify = (req, res, next) => {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
  if (!authHeader) return res.status(400).json({ message: 'Unauthorized' });
  const token = authHeader?.split(' ')[1];

  // const token = req.cookies.aToken;

  if (!token) return res.status(400).json({ message: 'Unauthorized' });

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: 'Invalid Token' });
      }

      const me = await User.findById(decode._id).select('-password').populate(['followers', 'following']).exec();
      req.me = me;

      next();
    })
  );
};

export default tokenVerify;
