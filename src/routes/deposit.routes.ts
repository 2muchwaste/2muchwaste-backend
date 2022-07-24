import express, { Router } from 'express';
import DepositController from '../controllers/deposit.controller';
import DepositModel from '../models/deposits.model';
import { customerHandlers } from '../utils/constants';

const router: Router = express.Router();
const controller = new DepositController('Deposits');

router.use(customerHandlers);
router
  .route('/')
  .get(controller.getAll(DepositModel))
  .post(controller.createDeposit(DepositModel));
router
  .route('/:id')
  .get(controller.getByID(DepositModel))
  .patch(controller.updateByID(DepositModel))
  .delete(controller.deleteByID(DepositModel));
router
  .route('/dumpster/:id')
  .get(controller.getDepositsFromDumpster(DepositModel));
router.route('/user/:id').get(controller.getDepositsFromUser(DepositModel));

export default router;
