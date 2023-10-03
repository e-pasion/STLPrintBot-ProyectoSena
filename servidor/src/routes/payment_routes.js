import {Router} from 'express';
import * as paymentController from '../controllers/payment_controller.js'

import { verifyToken } from '../middlewares/authJwt.js';

const router = Router();


router.get('/',[verifyToken],  paymentController.createPaymentLink);


export default router;