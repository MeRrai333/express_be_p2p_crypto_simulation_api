import { Router } from 'express';
import * as controller from '../controllers/userController';

const router = Router();

router.get('/', controller.getUsers);
router.post('/', controller.postUser);
router.post('/signIn', controller.postSignIn);
router.put('/id/:id', controller.putUserById);
router.get('/id/:id', controller.getUserById);
router.get('/id/:id/payments', controller.getUserByIdWithPayments);
router.get('/id/:id/wallets', controller.getUserByIdWithWallets);
router.get('/id/:id/p2pBuys', controller.getUserByIdWithP2PBuys);
router.get('/id/:id/p2pBuyLogs', controller.getUserByIdWithP2PBuyLogs);
router.get('/id/:id/p2pSells', controller.getUserByIdWithP2PSells);
router.get('/id/:id/p2pSellLogs', controller.getUserByIdWithP2PSellLogs);
router.delete('/id/:id', controller.deleteUserById);
router.get('/email/:email', controller.getUserByEmail);
router.delete('/email', controller.deleteUserByEmail);

export default router;