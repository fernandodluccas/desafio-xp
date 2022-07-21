import { Request, Response } from 'express';

class AccountBalanceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const balance = accountBalanceService.handle(Number(id));

    return res.status(201).json(balance);
  }
}

export default new AccountBalanceController();
