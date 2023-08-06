import {Router} from 'express';
import * as colorController from '../controllers/color_controller.js';
import { verifyToken,isEmployee } from '../middlewares/authJwt.js';

const router = Router();


router.post('/', colorController.createColor);
// router.get('/',[verifyToken,isEmployee], colorController.getAllColors);
router.get('/', colorController.getAllColors);
router.get('/:id', colorController.getColor);
router.put('/:id', colorController.updateColor);
router.put('/status/:id', colorController.toggleColorStatus);
router.delete('/:id',colorController.deleteColor)


export default router;