import {Router} from 'express';
import { uploadStlAndImg } from '../middlewares/multerConfig.js';
import { initializeApp } from "firebase/app"
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { firebaseConfig } from '../config/firebase.js';
const router = Router();
import multer from 'multer';

import * as productController from '../controllers/product_controller.js';
import { verifyToken } from '../middlewares/authJwt.js';


//Initialize a firebase application
initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });


router.get('/:id',[verifyToken],productController.getProduct)
router.delete('/:id',[verifyToken],productController.deleteProduct)
router.post('/cotization',verifyToken,productController.cotization);
// router.post('/',[verifyToken,uploadStlAndImg.array('dataFiles',2)],productController.createProduct);
router.post('/',[verifyToken,upload.array('dataFiles',2)],productController.createProduct);
router.put('/quantity/:id',[verifyToken],productController.updateQuantityProduct);




export default router;