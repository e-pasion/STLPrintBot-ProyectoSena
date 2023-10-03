import {Router} from 'express';
import * as codeController from '../controllers/code_controller.js';
import { verifyToken, isAdmin } from '../middlewares/authJwt.js';

const router = Router();


router.post('/',[verifyToken,isAdmin], codeController.createCode);
router.post('/verify',verifyToken,codeController.verifyCode)
router.get('/',[verifyToken,isAdmin], codeController.getCodes);
router.get('/:id',verifyToken, codeController.getCode);
router.put('/:id',[verifyToken,isAdmin], codeController.updateCode);
router.put('/status/:id',[verifyToken,isAdmin], codeController.toggleCodeStatus);
router.delete('/:id',[verifyToken,isAdmin],codeController.deleteCode)


export default router;