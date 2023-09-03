import { Router } from 'express';
import tokenVerify from '../middlewares/tokenVerify.js';
import { createPost, deletePost, fetchAllPost, fetchSinglePost, updatePost } from '../controller/PostController.js';
import { multerMiddleware } from '../middlewares/multer.js';

const router = Router();

router.use(tokenVerify);

router.route('/').get(fetchAllPost).post(multerMiddleware, createPost);
router.route('/:id').get(fetchSinglePost).delete(deletePost).put(updatePost).patch(updatePost);

export default router;
