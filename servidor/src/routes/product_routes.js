import {Router} from 'express';
import { uploadStlAndImg,uploadTemporalStl } from '../middlewares/multerConfig.js';
const router = Router();

import * as productController from '../controllers/product_controller.js';
import { verifyToken } from '../middlewares/authJwt.js';

router.get('/:id',[verifyToken],productController.getProduct)
router.post('/cotization', uploadTemporalStl.single('stl'),productController.cotization);
router.post('/',[verifyToken,uploadStlAndImg.array('dataFiles',2)],productController.createProduct);
router.put('/quantity/:id',[verifyToken],productController.updateQuantityProduct);




export default router;