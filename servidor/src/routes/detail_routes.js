import {Router} from 'express';
import * as detailController from '../controllers/detail_controller.js';
import { verifyToken,isEmployee } from '../middlewares/authJwt.js';

const router = Router();


router.get('/',[verifyToken,isEmployee], detailController.getAllDetails);


export default router;