import express, { Router } from 'express';
import DepositController from '../controllers/deposit.controller';
import DepositsModel from '../models/deposits.model';

const router: Router = express.Router();
const depositController = new DepositController('Deposits');

router
  .route('/')
  .get(depositController.getAll(DepositsModel))
  .post(depositController.createOne(DepositsModel));
router
  .route('/:id')
  .get(depositController.getByID(DepositsModel))
  .put(depositController.updateByID(DepositsModel))
  .delete(depositController.deleteByID(DepositsModel));

export default router;
