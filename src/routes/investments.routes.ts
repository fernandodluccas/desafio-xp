import { Router } from 'express';

import investmentsBuyController from '../controllers/investment.buy.controller';
import investmentsSellController from '../controllers/investment.sell.controller';

const investmentsRoutes = Router();

investmentsRoutes.post('/buy', investmentsBuyController.handle);
investmentsRoutes.post('/sell', investmentsSellController.handle);

export default investmentsRoutes;
