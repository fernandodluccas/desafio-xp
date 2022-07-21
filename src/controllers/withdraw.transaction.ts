import { Request, Response } from 'express';
import withdrawTransactionService from '../services/withdraw.transaction.service';

class WithdrawTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, amount, type } = req.body;
    const result = await withdrawTransactionService.execute({
      id,
      amount,
      type,
    });

    return res.status(201).json(result);
  }
}

export default new WithdrawTransactionController();
