import {Router} from 'express';
const router = Router();
import { verifyToken,isAdmin } from '../middlewares/authJwt.js';
import { duplicateEmail } from '../middlewares/authValidation.js'


import * as cartController from '../controllers/cart_controller.js';


router.get('/',[verifyToken],cartController.getCartProducts)
router.get('/price',[verifyToken],cartController.getTotalPrice)

export default router;