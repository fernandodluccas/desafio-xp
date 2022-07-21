import { Request, Response } from 'express';
import accountWithdrawService from '../services/account.withdraw.service';

class AccountWithdrawController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, amount, type } = req.body;
    const result = await accountWithdrawService.execute({
      id,
      amount,
      type,
    });

    return res.status(200).json(result);
  }
}

export default new AccountWithdrawController();
