import { Request, Response } from 'express';
import assetService from '../services/asset.service';

class AssetsController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const assets = await assetService.execute(id);

    return res.status(200).json(assets);
  }
}

export default new AssetsController();
