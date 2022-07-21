import { Request, Response } from 'express';
import accountDepositService from '../services/account.deposit.service';

class AccountDepositController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, amount, type } = req.body;
    const result = await accountDepositService.execute({
      id,
      amount,
      type,
    });

    return res.status(201).json(result);
  }
}

export default new AccountDepositController();
