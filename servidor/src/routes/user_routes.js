import {Router} from 'express';
const router = Router();
import { duplicateEmail } from '../middlewares/authValidation.js'
import { verifyToken } from '../middlewares/authJwt.js';


import * as userController from '../controllers/user_controller.js';
router.get('/employees', userController.getEmployees);
router.get('/',verifyToken, userController.getUser);
router.put('/status/:id',userController.toggleEmployeeStatus)
router.put('/employee/:id',userController.editEmployee)
router.delete('/employee/:id',userController.removeEmployee)

export default router;