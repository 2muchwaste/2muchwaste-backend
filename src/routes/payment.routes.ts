import express, { Router } from 'express';
import PaymentController from '../controllers/payment.controller';
import PaymentModel from '../models/payment.model';

const router: Router = express.Router();
const controller = new PaymentController('Payment');

router
  .route('/')
  .get(controller.getAll(PaymentModel))
  .post(controller.createOne(PaymentModel));
router
  .route('/:id')
  .get(controller.getByID(PaymentModel))
  .put(controller.updateByID(PaymentModel))
  .delete(controller.deleteByID(PaymentModel));

export default router;
