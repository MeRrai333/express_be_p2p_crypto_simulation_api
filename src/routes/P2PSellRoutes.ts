import { Router } from 'express';
import * as controller from '../controllers/P2PSellController';
import * as controllerLog from '../controllers/P2PSellLogController';

const router = Router();

router.get('/coin/:coin', controller.getP2PSellByShortNameCoin);
router.get('/id/:id', controller.getP2PSellById);
router.get('/id/:id/logs', controllerLog.getP2PSellLogByP2PSellId);
router.get('/user/id/:userId', controller.getP2PSellByUserId);
router.post('/', controller.postP2PSell);
router.put('/id/:id', controller.putP2PSellById);
router.delete('/id/:id', controller.deleteP2PSellById);

router.post('/order', controller.openP2PSellOrder);
router.put('/order/id/:id', controller.succesP2PSellOrder);

export default router;