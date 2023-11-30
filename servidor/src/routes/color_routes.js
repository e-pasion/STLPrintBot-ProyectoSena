import {Router} from 'express';
import * as colorController from '../controllers/color_controller.js';
import { isAdmin, verifyToken } from '../middlewares/authJwt.js';

const router = Router();


router.post('/',[verifyToken,isAdmin], colorController.createColor);
router.get('/', colorController.getAllColors);
router.get('/all/', colorController.getAllColorsWithoutFilter);
router.get('/:id', colorController.getColor);
router.put('/:id',[verifyToken,isAdmin], colorController.updateColor);
router.put('/status/:id',[verifyToken,isAdmin], colorController.toggleColorStatus);
router.delete('/:id',[verifyToken,isAdmin],colorController.deleteColor)


export default router;