import { Request, Response } from 'express';
import investmentSellService from '../services/investment.sell.service';

class InvestmentsSellController {
  async handle(req: Request, res: Response) {
    const investment = await investmentSellService.execute(req.body);
    return res.status(200).json(investment);
  }
}

export default new InvestmentsSellController();
