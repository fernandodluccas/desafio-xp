import { Request, Response } from 'express';
import authenticateCustomerService from '../services/authenticate.customer.service';

class AuthenticateCustomerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const token = await authenticateCustomerService.execute({
      email,
      password,
    });

    return res.status(200).json({ token });
  }
}

export default new AuthenticateCustomerController();
