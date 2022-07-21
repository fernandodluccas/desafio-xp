import { Router } from 'express';
import authenticateRoutes from './authenticate.routes';
import customerRoutes from './customers.routes';
import accountsRoutes from './accounts.routes';
import assetsRoutes from './assets.routes';

const routes = Router();

routes.use('/customers', customerRoutes);
routes.use('/authenticate', authenticateRoutes);
routes.use('/accounts', accountsRoutes);
routes.use('/assets', assetsRoutes);

export default routes;
