import { Request, Response } from 'express';
import assetsCustomerService from '../services/assets.customer.service';

class AssetsCustomerController {
  async handle(req: Request, res: Response) {
    const { customerId } = req.params;

    const assets = await assetsCustomerService.execute(customerId);

    return res.status(200).json(assets);
  }
}

export default new AssetsCustomerController();
