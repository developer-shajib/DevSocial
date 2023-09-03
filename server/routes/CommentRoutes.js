import { Router } from 'express';
import tokenVerify from '../middlewares/tokenVerify.js';
import { createComment, deleteComment, fetchAllComment, fetchSingleComment, updateComment } from '../controller/CommentController.js';

const router = Router();

router.use(tokenVerify);

router.route('/').get(fetchAllComment).post(createComment);
router.route('/:id').get(fetchSingleComment).delete(deleteComment).put(updateComment).patch(updateComment);

export default router;
