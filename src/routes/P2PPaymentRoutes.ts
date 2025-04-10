import { Router } from 'express';
import * as controller from '../controllers/P2PPaymentController';

const router = Router();

router.get('/user/id/:userId', controller.getP2PPaymentByUserId);
router.get('/id/:id', controller.getP2PPaymentById);
router.post('/', controller.postP2PPayment);
router.put('/id/:id', controller.putP2PPaymentById);
router.delete('/id/:id', controller.deleteP2PPaymentById);

export default router;