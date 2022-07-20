import { Router } from 'express';

const routes = Router();

routes.use('/customers', require('./customers'));

export default routes;
