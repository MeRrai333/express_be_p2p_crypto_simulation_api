import { Router } from 'express';
import * as controller from '../controllers/cryptoController';

const router = Router();

router.get('/', controller.getCryptos);
router.get('/id/:id', controller.getCryptosById);
router.put('/id/:id', controller.putCryptosById);
router.delete('/id/:id', controller.deleteCryptosById);
router.post('/', controller.postCrypto);
router.post('/many', controller.postManyCrypto);

export default router;