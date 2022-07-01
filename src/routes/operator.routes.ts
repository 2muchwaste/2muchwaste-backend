import express, { Router } from 'express';
import OperatorController from '../controllers/operator.controller';

const router: Router = express.Router();
const operatorController = new OperatorController();

router
  .route('/')
  .get(operatorController.getOperators)
  .post(operatorController.createOperator);
router
  .route('/:id')
  .get(operatorController.getOperatorByID)
  .put(operatorController.updateOperator)
  .delete(operatorController.deleteOperator);

export default router;
