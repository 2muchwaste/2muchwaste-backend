import express, { Router } from 'express';
import DepositController from '../controllers/deposit.controller';
import DepositModel from '../models/deposits.model';

const router: Router = express.Router();
const controller = new DepositController('Deposits');

router
  .route('/')
  .get(controller.getAll(DepositModel))
  .post(controller.createDeposit(DepositModel));
router
  .route('/:id')
  .get(controller.getByID(DepositModel))
  .put(controller.updateByID(DepositModel))
  .delete(controller.deleteByID(DepositModel));
router
  .route('/dumpster/:id')
  .get(controller.getDepositsFromDumpster(DepositModel));

export default router;
