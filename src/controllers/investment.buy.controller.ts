import { Request, Response } from 'express';
import investmentBuyService from '../services/investment.buy.service';

class InvestmentsBuyController {
  async handle(req: Request, res: Response) {
    const investment = await investmentBuyService.execute(req.body);

    return res.status(201).json(investment);
  }
}

export default new InvestmentsBuyController();
