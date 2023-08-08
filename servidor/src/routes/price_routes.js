import {Router} from 'express';
import * as priceController from '../controllers/price_controller.js';
import { verifyToken,isEmployee } from '../middlewares/authJwt.js';

const router = Router();


router.get('/', priceController.getPriceData);



export default router;