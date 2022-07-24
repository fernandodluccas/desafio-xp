import { Request, Response } from 'express';
import createCustomerService from '../services/create.customer.service';

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const customer = await createCustomerService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(customer);
  }
}

export default new CreateCustomerController();
