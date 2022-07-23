import { Router } from 'express';
import authenticateCustomerController from '../controllers/authenticate.customer.controller';
import authenticateValidate from '../middlewares/authenticate.validate';

const authenticateRoutes = Router();

authenticateRoutes.post(
  '/',
  authenticateValidate,
  authenticateCustomerController.handle
);

export default authenticateRoutes;
