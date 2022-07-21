import { Router } from 'express';
import customerRoutes from './customers.routes';

const routes = Router();

routes.use('/customers', customerRoutes);

export default routes;
