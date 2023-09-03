import asyncHandler from 'express-async-handler';
import Comment from '../mongoDB/models/Comment.js';
import Post from '../mongoDB/models/Post.js';

/**
 * @DESC Get All Comment
 * @ROUTE /api/v1/comment
 * @method GET
 * @access public
 */
export const fetchAllComment = asyncHandler(async (req, res) => {
  let comment = await Comment.find().populate(['commentedUserId', 'postId']);

  res.status(200).json({ data: comment, message: 'Fetch All comment success.' });
});

/**
 * @DESC Get Single Comment
 * @ROUTE /api/v1/comment/id
 * @method GET
 * @access public
 */
export const fetchSingleComment = asyncHandler(async (req, res) => {
  // comment exist check
  const comment = await Comment.findById(req.params.id).populate(['commentedUserId', 'postId']);

  if (!comment) return res.status(404).json({ message: 'Comment not found!' });

  res.status(200).json({ data: comment, message: 'Fetch All comment data success.' });
});

/**
 * @DESC Create a Comment
 * @ROUTE /api/v1/comment
 * @method POST
 * @access public
 */
export const createComment = asyncHandler(async (req, res) => {
  const { commentedUserId, postId, text } = req.body;

  // check validation
  if (!commentedUserId || !postId || !text) {
    return res.status(400).json({ message: 'Comment is required!' });
  }

  // create comment data
  const comment = await Comment.create({
    commentedUserId,
    postId,
    text: req?.body?.text
  });

  await Post.findByIdAndUpdate(postId, { $push: { comment: comment._id } });

  const data = await Comment.findById(comment._id).populate(['commentedUserId', 'postId']);

  // check
  if (comment) {
    return res.status(201).json({ data, message: 'You are a commented.' });
  } else {
    return res.status(400).json({ message: 'Comment is not created' });
  }
});

/**
 * @DESC Delete a Comment
 * @ROUTE /api/v1/comment/id
 * @method DELETE
 * @access public
 */
export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id).populate(['commentedUserId', 'postId']);

  if (!comment) return res.status(400).json({ message: 'Comment is not deleted.' });

  await Post.findByIdAndUpdate(comment.postId, { $pull: { comment: req.params.id } });

  res.status(200).json({ data: comment, message: 'This comment deleted successful.' });
});

/**
 * @DESC Update a Comment
 * @ROUTE /api/v1/comment/id
 * @method PUT/PATCH
 * @access public
 */
export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id).populate(['commentedUserId', 'postId']);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  if (!req?.body) return res.status(400).json({ message: 'You nothing changed' });

  // for status update
  let status = comment.status;
  if (req.body.status === true) {
    status = true;
  } else if (req.body.status === false) {
    status = false;
  }

  // for trash update
  let trash = comment.trash;
  if (req.body.trash === true) {
    trash = true;
  } else if (req.body.trash === false) {
    trash = false;
  }

  // Update All Comment data
  const commentUpdate = await Comment.findByIdAndUpdate(
    id,
    {
      text: req?.body?.text ? req.body.text : comment.text,
      status,
      trash
    },
    { new: true }
  ).populate(['commentedUserId', 'postId']);

  res.status(200).json({ data: commentUpdate, message: `Update success` });
});
