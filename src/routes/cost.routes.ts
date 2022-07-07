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
  .route('/:id')
  .get(controller.getByID(CostModel))
  .put(controller.updateByID(CostModel))
  .delete(controller.deleteByID(CostModel));

export default router;
