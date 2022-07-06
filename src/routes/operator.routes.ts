import express, { Router } from 'express';
import OperatorController from '../controllers/operator.controller';
import { Roles } from '../enums/Roles';
import OperatorModel from '../models/operator.model';

const router: Router = express.Router();
const operatorController = new OperatorController(Roles.OPERATOR.toString());

router
  .route('/')
  .get(operatorController.getAll(OperatorModel))
  .post(operatorController.createOne(OperatorModel));
router
  .route('/:id')
  .get(operatorController.getByID(OperatorModel))
  .put(operatorController.updateByID(OperatorModel))
  .delete(operatorController.deleteByID(OperatorModel));

export default router;
