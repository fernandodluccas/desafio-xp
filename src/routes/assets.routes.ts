import { Router } from 'express';

const assetsRoutes = Router();

assetsRoutes.get('/stockId');
assetsRoutes.get('/customerId');

export default assetsRoutes;
