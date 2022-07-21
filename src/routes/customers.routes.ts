import { Router } from 'express';
import createCustomerController from '../controllers/create.customer.controller';

const customerRoutes = Router();

customerRoutes.post('/', createCustomerController.handle);

export default customerRoutes;
