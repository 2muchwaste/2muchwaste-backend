import express, { Router } from 'express';
import DepositController from '../controllers/deposit.controller';
import DepositsModel from '../models/deposits.model';

const router: Router = express.Router();
const controller = new DepositController('Deposits');

router
  .route('/')
  .get(controller.getAll(DepositsModel))
  .post(controller.createOne(DepositsModel));
router
  .route('/:id')
  .get(controller.getByID(DepositsModel))
  .put(controller.updateByID(DepositsModel))
  .delete(controller.deleteByID(DepositsModel));

export default router;
