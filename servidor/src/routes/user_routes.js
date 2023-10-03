import {Router} from 'express';
const router = Router();
import { duplicateEmail } from '../middlewares/authValidation.js'
import { verifyToken } from '../middlewares/authJwt.js';


import * as userController from '../controllers/user_controller.js';
router.get('/',verifyToken, userController.getUser);
router.put('/contact',verifyToken,userController.editContactInfo)
router.put('/access',verifyToken,userController.updatePasswordAndEmail)

export default router;