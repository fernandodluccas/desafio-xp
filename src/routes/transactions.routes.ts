import { Router } from 'express';
import depositTransactionController from '../controllers/deposit.transaction';

const transactionsRoutes = Router();

transactionsRoutes.post('/deposit', depositTransactionController.handle);
transactionsRoutes.post('/deposit', depositTransactionController.handle);

export default transactionsRoutes;
