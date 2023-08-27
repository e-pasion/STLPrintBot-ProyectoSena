import {Router} from 'express';
const router = Router();
import { verifyToken,isAdmin } from '../middlewares/authJwt.js';
import { duplicateEmail } from '../middlewares/authValidation.js'


import * as cartController from '../controllers/cart_controller.js';


router.get('/',[verifyToken],cartController.getCart)
router.get('/price',[verifyToken],cartController.getProductPrice)
router.post('/ship',[verifyToken],cartController.getShipPrice)
router.post('/shipData',[verifyToken],cartController.saveShipData)

export default router;