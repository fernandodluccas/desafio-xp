import { Router } from 'express';
import authenticateRoutes from './authenticate.routes';
import customerRoutes from './customers.routes';
import transactionsRoutes from './transactions.routes';

const routes = Router();

routes.use('/customers', customerRoutes);
routes.use('/authenticate', authenticateRoutes);
routes.use('/account', transactionsRoutes);

export default routes;
