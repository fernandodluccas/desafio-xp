import { Request, Response } from 'express';
import depositTransactionService from '../services/deposit.transaction.service';

class DepositTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, amount, type } = req.body;
    const result = await depositTransactionService.execute({
      id,
      amount,
      type,
    });

    return res.status(201).json(result);
  }
}

export default new DepositTransactionController();
