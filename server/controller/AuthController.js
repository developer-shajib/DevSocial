import JWT from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../mongoDB/models/User.js';
import Post from '../mongoDB/models/Post.js';
import { sendMail } from '../utils/sendMail.js';

/**
 * @DESC Login User
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @access public
 */
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check isValid User
  if (!email || !password) return res.json({ message: 'All fields are required!' });

  const user = await User.findOne({ email }).populate(['followers', 'following']);

  if (!user) return res.status(400).json({ message: 'You have no account.' });

  // password check
  const checkPass = await bcrypt.compare(password, user.password);

  if (!checkPass) return res.status(400).json({ message: 'Invalid Password' });

  if (!user.isVerified) {
    // create verify token
    const token = JWT.sign({ _id: user._id, email: user.email }, process.env.EMAIL_VERIFY_TOKEN_SECRET, {
      expiresIn: '15m'
      // process.env.VERIFY_TOKEN_EXPIRE_IN
    });

    const link = `${process.env.BASE_URL}/verify/${token}`;

    // send email
    await sendMail({ to: user.email, sub: 'Verify Account', name: user.username, msg: 'To activate your Account, please verify your email address.', link });

    return res.status(400).json({ message: 'We sent an email please verify your account!' });
  }

  const accessToken = JWT.sign({ _id: user._id, email: user.email }, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.ATOKEN_EXPIRE
  });

  //     const refreshToken = JWT.sign({ _id: user._id, email: user.email }, process.env.REFRESH_TOKEN, {
  //       expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
  //     });

  const users = await User.find().populate(['followers', 'following']);
  const posts = await Post.find()
    .populate({
      path: 'comment',
      populate: {
        path: 'commentedUserId',
        model: 'User'
      }
    })
    .populate(['postedUserId', 'like']);

  // send client side
  res
    .status(200)
    .cookie('aToken', accessToken, {
      httpOnly: false,
      secure: false,
      maxAge: parseInt(process.env.COOKIE_EXPIRE),
      sameSite: 'strict'
    })
    .json({ token: accessToken, user, users, posts, message: 'Login success.' });
});

/**
 * @DESC Register
 * @ROUTE /api/v1/auth/register
 * @method POST
 * @access public
 */
export const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // check validation
  if (!username || !password || !email) return res.status(400).json({ message: 'All fields are required' });

  // isExist email
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: 'Email already exists' });
  }
  // make hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user data
  const user = await User.create({
    username,
    email,
    password: hash
  });

  // check
  if (user) {
    // create verify token
    const token = JWT.sign({ _id: user._id, email: user.email }, process.env.EMAIL_VERIFY_TOKEN_SECRET, {
      expiresIn: '15m'
      // process.env.VERIFY_TOKEN_EXPIRE_IN
    });

    const link = `${process.env.BASE_URL}/verify/${token}`;

    // send email
    await sendMail({ to: user.email, sub: 'Verify Account', name: user.username, msg: 'To activate your Account, please verify your email address. Your account will not be created until your email address is confirmed.', link });

    return res.status(201).json({ data: user, message: 'Check your email & activate account!' });
  } else {
    return res.status(400).json({ message: 'Invalid user data. Try Again!' });
  }
});

/**
 * @DESC Logout User
 * @ROUTE /api/v1/auth/logout
 * @method POST
 * @access public
 */
export const userLogout = asyncHandler((req, res) => {
  res.status(200).clearCookie('aToken').json({ message: 'Logout success.' });
});

/**
 * @DESC logged In user
 * @ROUTE /api/v1/auth/me
 * @method GET
 * @access public
 */
export const me = asyncHandler(async (req, res) => {
  const users = await User.find().populate(['followers', 'following']);
  const posts = await Post.find()
    .populate({
      path: 'comment',
      populate: {
        path: 'commentedUserId',
        model: 'User'
      }
    })
    .populate(['postedUserId', 'like']);

  res.status(200).json({ user: req.me, users, posts, message: 'Logged in user.' });
});

/**
 * @DESC register verify token
 * @ROUTE /api/v1/auth/verify/token
 * @method GET
 * @access public
 */
export const registerVerifyToken = asyncHandler(async (req, res) => {
  const token = req.params.token;

  if (!token) return res.status(400).json({ message: 'Token not found!' });

  JWT.verify(
    token,
    process.env.EMAIL_VERIFY_TOKEN_SECRET,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: 'Token has been expire!' });
      }

      const updateUser = await User.findByIdAndUpdate(decode._id, { isVerified: true });

      // find all data
      const user = await User.findById(decode._id).populate(['followers', 'following']);
      const users = await User.find().populate(['followers', 'following']);
      const posts = await Post.find()
        .populate({
          path: 'comment',
          populate: {
            path: 'commentedUserId',
            model: 'User'
          }
        })
        .populate(['postedUserId', 'like']);

      // create access token for cookie
      const accessToken = JWT.sign({ _id: user._id, email: user.email }, process.env.ACCESS_TOKEN, {
        expiresIn: process.env.ATOKEN_EXPIRE
      });

      // send client side
      res
        .status(200)
        .cookie('aToken', accessToken, {
          httpOnly: false,
          secure: false,
          maxAge: parseInt(process.env.COOKIE_EXPIRE),
          sameSite: 'strict'
        })
        .json({ token: accessToken, user, users, posts, message: 'Account Verify successful.' });
    })
  );
});

/**
 * @DESC Request For forget password
 * @ROUTE /api/v1/auth/forget
 * @method POST
 * @access public
 */
export const forgetPassword = asyncHandler(async (req, res) => {
  // <!-- email validation -->
  if (!req.body.email) return res.status(400).json({ message: 'Email is required' });

  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ message: 'User not found!' });

  // create verify token and link
  const token = JWT.sign({ _id: user._id, email: user.email }, process.env.EMAIL_VERIFY_TOKEN_SECRET, {
    expiresIn: '1d'
  });

  const link = `${process.env.BASE_URL}/forget/${token}`;

  // send email
  await sendMail({ to: user.email, sub: 'Reset Password', name: user.username, msg: 'To Reset you password, please verify your email address.', link });

  // send server
  return res.status(200).json({ message: 'Check you email and verify now!' });
});

/**
 * @DESC Reset Password
 * @ROUTE /api/v1/auth/forget/token
 * @method POST
 * @access public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!token) return res.status(400).json({ message: 'Token not found!' });

  if (!password || !confirmPassword) return res.status(400).json({ message: 'Please set a new password' });

  if (password !== confirmPassword) return res.status(400).json({ message: 'Confirm password not match!' });

  JWT.verify(
    token,
    process.env.EMAIL_VERIFY_TOKEN_SECRET,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: 'Verify link has been expire!' });
      }

      // make hash password and update it
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.findByIdAndUpdate(decode._id, { password: hashPassword }, { new: true });

      // send client side
      res.status(200).json({ user, message: 'Password change successful.' });
    })
  );
});
