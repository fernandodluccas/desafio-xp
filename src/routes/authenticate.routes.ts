import { Router } from 'express';
import createCustomerController from '../controllers/create.customer.controller';
import authenticateValidate from '../middleware/authenticate.validate';

const authenticateRoutes = Router();

authenticateRoutes.post(
  '/',
  authenticateValidate,
  createCustomerController.handle
);

export default authenticateRoutes;
