import {Router} from 'express';
import * as paymentController from '../controllers/payment_controller.js'
import { verifyToken,isEmployee } from '../middlewares/authJwt.js';

const router = Router();


router.post('/',[verifyToken],  paymentController.createOrder);
router.get('/success', (req,res)=> res.send("todo god"));
router.get('/failure', (req,res)=> res.send("todo bad"));
router.get('/pending', (req,res)=> res.send("todo pending"));
router.post('/webhook', paymentController.receiveWebhook);



// router.get('/:id', colorController.getColor);
// router.put('/:id', colorController.updateColor);

export default router;