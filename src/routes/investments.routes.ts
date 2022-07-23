import { Router } from 'express';

import investmentsBuyController from '../controllers/investment.buy.controller';

const investmentsRoutes = Router();

investmentsRoutes.post('/buy', investmentsBuyController.handle);
investmentsRoutes.post('/sell');

export default investmentsRoutes;
