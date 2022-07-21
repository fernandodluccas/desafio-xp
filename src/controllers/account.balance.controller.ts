import { Request, Response } from 'express';
import accountBalanceService from '../services/account.balance.service';

class AccountBalanceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const balance = await accountBalanceService.execute(id);

    return res.status(200).json(balance);
  }
}

export default new AccountBalanceController();
