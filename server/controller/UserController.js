import JWT from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../mongoDB/models/User.js';
import { cloudUpload } from '../utils/cloudinary.js';
/**
 * @DESC Get All User
 * @ROUTE /api/v1/user
 * @method GET
 * @access public
 */
export const fetchAllUser = asyncHandler(async (req, res) => {
  const user = await User.find().populate(['following', 'followers']);

  res.status(200).json({ data: user, message: 'Fetch All user data success.' });
});

/**
 * @DESC Get Single User
 * @ROUTE /api/v1/user/id
 * @method GET
 * @access public
 */
export const fetchSingleUser = asyncHandler(async (req, res) => {
  // user exist check
  const user = await User.findById(req.params.id).select('-password').populate(['following', 'followers']);

  if (!user) return res.status(404).json({ message: 'User not found!' });

  res.status(200).json({ data: user, message: 'Fetch All user data success.' });
});

/**
 * @DESC Create a User
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const createUser = asyncHandler(async (req, res) => {
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
    return res.status(201).json({ data: user, message: 'User created successful' });
  } else {
    return res.status(400).json({ message: 'User not created. Try again!' });
  }
});

/**
 * @DESC Delete a User
 * @ROUTE /api/v1/user
 * @method DELETE
 * @access public
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id).populate(['following', 'followers']);

  if (!user) return res.status(400).json({ message: 'Your account not deleted' });

  res.status(200).clearCookie('aToken').json({ message: 'Your account deleted successful.' });
});

/**
 * @DESC Update a User
 * @ROUTE /api/v1/user
 * @method PUT/PATCH
 * @access public
 */

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).populate('following');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!req?.body) return res.status(400).json({ message: 'You nothing changed' });

  // for isVerified update
  let isVerified = req.body?.isVerified || user.isVerified;

  // for token update
  let token = user.token;
  if (req.body.token === '' || null || false) {
    token = null;
  } else if (req.body.token) {
    token = req.body.token;
  }

  // for status update
  let status = req.body.status || user.status;

  // for trash update
  let trash = req.body.trash || user.trash;

  // hash password
  let hashPassword = user.password;
  if (req.body?.password) {
    hashPassword = await bcrypt.hash(req.body.password, 10);
  }

  // Followers update
  let following = user.following;

  if (req.body.following) {
    const checkFollowing = following.find((item) => item._id == req.body.following);

    if (checkFollowing) {
      following = following.filter((item) => item._id != req.body.following);
      await User.findByIdAndUpdate(req.body.following, { $pull: { followers: user._id } });
    } else {
      following = [...following, req.body.following];
      await User.findByIdAndUpdate(req.body.following, { $push: { followers: user._id } });
    }
  }

  // <!-- photo update -->
  let photo = user.photo;
  if (req?.files['photo']) {
    const photoData = await cloudUpload(req?.files['photo'][0].path);
    photo = photoData?.secure_url;
  }

  // <!-- cover photo update -->
  let cover = user.cover;
  if (req?.files['cover']) {
    const coverPhotoData = await cloudUpload(req?.files['cover'][0].path);
    cover = coverPhotoData?.secure_url;
  }

  // Update All User data
  const userUpdate = await User.findByIdAndUpdate(
    id,
    {
      username: req?.body?.username ? req.body.username : user.username,
      email: req?.body?.email ? req.body.email : user.email,
      password: hashPassword,
      following,
      photo,
      cover,
      isVerified,
      token,
      status,
      trash
    },
    { new: true }
  ).populate(['following', 'followers']);

  res.status(200).json({ data: userUpdate, message: `Update success` });
});
