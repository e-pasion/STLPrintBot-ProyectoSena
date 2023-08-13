import {Router} from 'express';
import * as codeController from '../controllers/code_controller.js';
import { verifyToken,isEmployee } from '../middlewares/authJwt.js';

const router = Router();


router.post('/', codeController.createCode);
router.post('/verify',verifyToken,codeController.verifyCode)
router.get('/', codeController.getCodes);
router.get('/:id',verifyToken, codeController.getCode);
router.put('/:id', codeController.updateCode);
router.put('/status/:id', codeController.toggleCodeStatus);
router.delete('/:id',codeController.deleteCode)


export default router;