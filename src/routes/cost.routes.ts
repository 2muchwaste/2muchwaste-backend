import express, { Router } from 'express';
import CostController from '../controllers/cost.controller';
import CostModel from '../models/cost.model';

const router: Router = express.Router();
const controller = new CostController('Cost');

router
  .route('/')
  .get(controller.getAll(CostModel))
  .post(controller.createOne(CostModel));
router
  .route('/:type')
  .get(controller.getCost(CostModel))
  .put(controller.updatePrice(CostModel))
  .delete(controller.deleteByType(CostModel));

export default router;
