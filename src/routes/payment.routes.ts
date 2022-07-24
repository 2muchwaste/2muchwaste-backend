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
  .patch(controller.updateByID(PaymentModel))
  .delete(controller.deleteByID(PaymentModel));
router
  .route('/:id/status')
  .get(controller.getStatus(PaymentModel))
  .patch(controller.setStatus(PaymentModel));
router.route('/user/:userid').get(controller.getUserInvoices(PaymentModel));
export default router;
