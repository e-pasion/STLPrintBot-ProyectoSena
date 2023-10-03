import {Router} from 'express';
const router = Router();
import { verifyToken,isAdmin } from '../middlewares/authJwt.js';
import { duplicateEmail } from '../middlewares/authValidation.js'


import * as authController from '../controllers/auth_controller.js';

router.post('/login', authController.signIn);
router.post('/register',[duplicateEmail], authController.signUp);
router.post('/validate-password',verifyToken,authController.validatePassword)
router.post('/logout',verifyToken,authController.logout)

export default router;