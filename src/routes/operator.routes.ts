import express, { Router } from 'express';
import OperatorController from '../controllers/operator.controller';
import { Roles } from '../enums/Roles';
import OperatorModel from '../models/operator.model';

const router: Router = express.Router();
const controller = new OperatorController(Roles.OPERATOR.toString());

router
  .route('/')
  .get(controller.getAll(OperatorModel))
  .post(controller.createOne(OperatorModel));
router
  .route('/:id')
  .get(controller.getByID(OperatorModel))
  .put(controller.updateByID(OperatorModel))
  .delete(controller.deleteByID(OperatorModel));

export default router;
