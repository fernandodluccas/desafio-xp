import { Request, Response } from 'express';
import assetsService from '../services/assets.service';

class AssetsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const assets = await assetsService.execute(id);

    return res.status(201).json(assets);
  }
}

export default new AssetsController();
