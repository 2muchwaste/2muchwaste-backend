import express, { Router } from 'express';
import OperatorController from '../controllers/operator.controller';
import { Roles } from '../enums/Roles';
import OperatorModel from '../models/operator.model';
import { adminHandlers, operatorHandlers } from '../utils/constants';

const router: Router = express.Router();
const controller = new OperatorController(Roles.OPERATOR.toString());

router.get('/', adminHandlers, controller.getAll(OperatorModel));
router.use(operatorHandlers);
router
  .route('/:id')
  .get(controller.getByID(OperatorModel))
  .patch(controller.updateByID(OperatorModel))
  .delete(controller.deleteByID(OperatorModel));
router
  .route('/:cf/districts')
  .get(controller.getDistrictsFromOpCF(OperatorModel))
  .post(controller.addDistrictToOperator(OperatorModel));
router
  .route('/:cf/empties')
  .get(controller.getEmptiesFromOpCF(OperatorModel))
  .post(controller.addEmptyToOperator(OperatorModel));

export default router;
