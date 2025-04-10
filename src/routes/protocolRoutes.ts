import { Router } from 'express';
import * as controller from '../controllers/protocolController';

const router = Router();

router.get('/', controller.getProtocols);
router.post('/', controller.postProtocol);
router.get('/id/:id', controller.getProtocolById);
router.put('/id/:id', controller.putProtocolById);
router.delete('/id/:id', controller.deleteProtocoltById);
router.post('/many', controller.postManyProtocol);

export default router;