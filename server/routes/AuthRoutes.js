import { Router } from 'express';
import { userRegister, userLogin, userLogout, me, registerVerifyToken, forgetPassword, resetPassword } from '../controller/AuthController.js';
import tokenVerify from '../middlewares/tokenVerify.js';

const router = Router();

// <!-- Authentication  -->
router.route('/login').post(userLogin);
router.route('/register').post(userRegister);
router.route('/logout').post(userLogout);
router.route('/me').get(tokenVerify, me);

// <!-- User verification  -->
router.route('/verify/:token').get(registerVerifyToken);

// <!-- Forget Password -->
router.route('/forget').post(forgetPassword);
router.route('/forget/:token').post(resetPassword);

export default router;
