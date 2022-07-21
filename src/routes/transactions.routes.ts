import { Router } from 'express';
import depositTransactionController from '../controllers/deposit.transaction';
import withdrawTransactionController from '../controllers/withdraw.transaction';

const transactionsRoutes = Router();

transactionsRoutes.post('/deposit', depositTransactionController.handle);
transactionsRoutes.post('/withdraw', withdrawTransactionController.handle);

export default transactionsRoutes;
