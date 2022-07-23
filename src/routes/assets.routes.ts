import { Router } from 'express';
import assetsController from '../controllers/asset.controller';
import assetsValidate from '../middlewares/assets.validate';

const assetsRoutes = Router();

assetsRoutes.get('/:id', assetsValidate, assetsController.handle);

export default assetsRoutes;
