import { Router } from 'express';
import * as controller from '../controllers/paymentTypeController';

const router = Router();

router.get('/', controller.getPayments);
router.post('/', controller.postPaymentType);
router.get('/id/:id', controller.getPaymentTypeById);
router.put('/id/:id', controller.putPaymentTypeById);
router.delete('/id/:id', controller.deletePaymentById);
router.post('/many', controller.postManyPaymentType);

export default router;