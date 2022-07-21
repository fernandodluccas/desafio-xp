import { Router } from 'express';
import createCustomerController from '../controllers/create.customer.controller';
import customerValidate from '../middleware/customer.validate';

const authenticateRoutes = Router();

authenticateRoutes.post('/', customerValidate, createCustomerController.handle);

export default authenticateRoutes;
