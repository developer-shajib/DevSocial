import { Router } from 'express';
import { createUser, deleteUser, fetchAllUser, fetchSingleUser, updateUser } from '../controller/UserController.js';
import tokenVerify from '../middlewares/tokenVerify.js';
import { multerMiddleware } from '../middlewares/multer.js';

const router = Router();

router.use(tokenVerify);

router.route('/').get(fetchAllUser).post(createUser);
router.route('/:id').get(fetchSingleUser).delete(deleteUser).put(multerMiddleware, updateUser).patch(multerMiddleware, updateUser);

export default router;
