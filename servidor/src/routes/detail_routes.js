import {Router} from 'express';
import * as detailController from '../controllers/detail_controller.js';
import { isAdmin, verifyToken } from '../middlewares/authJwt.js';

const router = Router();


router.get('/',[verifyToken,isAdmin], detailController.getAllDetails);
router.get('/byUser',verifyToken,detailController.getAllDetailsById)
router.post('/',detailController.createDetail);
router.put('/status',[verifyToken,isAdmin],detailController.updateDetailStatus)


export default router;