import { Router } from 'express';
import accountDepositController from '../controllers/account.deposit.controller';
import accountWithdrawController from '../controllers/account.withdraw.controller';
import accountBalanceController from '../controllers/account.balance.controller';

const accountsRoutes = Router();

accountsRoutes.post('/deposit', accountDepositController.handle);
accountsRoutes.post('/withdraw', accountWithdrawController.handle);
accountsRoutes.get('/:id', accountBalanceController.handle);

export default accountsRoutes;
