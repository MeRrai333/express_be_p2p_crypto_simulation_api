import { Router } from 'express';
import * as controller from '../controllers/walletController';

const router = Router();

router.get('/', controller.getWallets);
router.get('/id/:id', controller.getWalletById);
router.get('/address/:addr/logs', controller.getWalletLogsByWalletAddr);
router.get('/user/id/:userId', controller.getWalletByUserId);
router.get('/address/:address', controller.getWalletByAddress);
router.put('/transfer/srcAddr/:addr', controller.transferCoin);
router.put('/receive/desAddr/:addr', controller.receiveCoin);

export default router;