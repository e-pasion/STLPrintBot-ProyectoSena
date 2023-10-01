import {Router} from 'express';

const router = Router();
import multer from 'multer';

import * as productController from '../controllers/product_controller.js';
import { verifyToken } from '../middlewares/authJwt.js';


const upload = multer({ storage: multer.memoryStorage() });

router.post('/cotization',productController.cotization);
router.post('/',[verifyToken,upload.array('dataFiles',2)],productController.createProduct);


router.get('/:id',[verifyToken],productController.getProduct)
router.delete('/:id',[verifyToken],productController.deleteProduct)
router.put('/quantity/:id',[verifyToken],productController.updateQuantityProduct);




export default router;