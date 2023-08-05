import {Router} from 'express';
const router = Router();
import { verifyToken,isAdmin } from '../middlewares/authJwt.js';
import { duplicateEmail } from '../middlewares/authValidation.js'


import * as userController from '../controllers/user_controller.js';
router.get('/employees', userController.getEmployees);
router.get('/:id', userController.getUser);

export default router;