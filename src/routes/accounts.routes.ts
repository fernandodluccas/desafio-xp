import { Router } from 'express';
import accountDepositController from '../controllers/account.deposit';
import accountWithdrawController from '../controllers/account.withdraw';
import accountBalanceController from '../controllers/account.balance';

const accountsRoutes = Router();

accountsRoutes.post('/deposit', accountDepositController.handle);
accountsRoutes.post('/withdraw', accountWithdrawController.handle);
accountsRoutes.get('/account/:id', accountBalanceController.handle);

export default accountsRoutes;
