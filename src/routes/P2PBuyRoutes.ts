import { Router } from 'express';
import * as controller from '../controllers/P2PBuyController';
import * as controllerLog from '../controllers/P2PBuyLogController';

const router = Router();

router.get('/coin/:coin', controller.getP2PBuyByShortNameCoin);
router.get('/id/:id', controller.getP2PBuyById);
router.get('/id/:id/logs', controllerLog.getP2PBuyLogByP2PBuyId);
router.get('/user/id/:userId', controller.getP2PBuyByUserId);
router.post('/', controller.postP2PBuy);
router.put('/id/:id', controller.putP2PBuyById);
router.delete('/id/:id', controller.deletP2PBuyById);

router.post('/order', controller.openP2PBuyOrder);
router.put('/order/id/:id', controller.succesP2PBuyOrder);

export default router;