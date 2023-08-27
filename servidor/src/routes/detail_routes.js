import {Router} from 'express';
import * as detailController from '../controllers/detail_controller.js';
import { verifyToken,isEmployee } from '../middlewares/authJwt.js';

const router = Router();


router.get('/',[verifyToken,isEmployee], detailController.getAllDetails);
router.post('/',detailController.createDetail);
router.put('/status',[verifyToken],detailController.updateDetailStatus)


export default router;