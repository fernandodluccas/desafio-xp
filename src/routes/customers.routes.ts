import { Router } from 'express';
import createCustomerController from '../controllers/create.customer.controller';
import customerValidate from '../middleware/customer.validate';

const customerRoutes = Router();

customerRoutes.post('/', customerValidate, createCustomerController.handle);

export default customerRoutes;
