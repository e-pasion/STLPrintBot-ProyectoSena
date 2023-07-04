import {Router} from 'express';
const router = Router();
import { verifyToken,isAdmin } from '../middlewares/authJwt.js';
import { duplicateEmail } from '../middlewares/authValidation.js'


import * as authController from '../controllers/auth_controller.js';

router.post('/login', authController.signIn);
router.post('/register-employee',[verifyToken,isAdmin,duplicateEmail],authController.signUpEmployee)
router.post('/register',[duplicateEmail], authController.signUp);


export default router;