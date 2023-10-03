import {Router} from 'express';
import * as priceController from '../controllers/price_controller.js';
import { verifyToken,isAdmin } from '../middlewares/authJwt.js';

const router = Router();


router.get('/',[verifyToken,isAdmin], priceController.getPriceData);
router.put('/:id',[verifyToken,isAdmin], priceController.updatePrice);



export default router;