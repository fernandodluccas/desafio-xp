import { Router } from 'express';
import authenticateRoutes from './authenticate.routes';
import customerRoutes from './customers.routes';
import accountsRoutes from './accounts.routes';

const routes = Router();

routes.use('/customers', customerRoutes);
routes.use('/authenticate', authenticateRoutes);
routes.use('/account', accountsRoutes);

export default routes;
