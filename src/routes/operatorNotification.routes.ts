import express, { Router } from 'express';
import OperatorNotificationController from '../controllers/operatorNotification.controller';
import OperatorNotificationModel from '../models/operatorNotification.model';

const router: Router = express.Router();
const controller = new OperatorNotificationController('OperatorNotification');

router
  .route('/')
  .get(controller.getAll(OperatorNotificationModel))
  .post(controller.createOne(OperatorNotificationModel));
router
  .route('/:id')
  .get(controller.getByID(OperatorNotificationModel))
  .put(controller.updateByID(OperatorNotificationModel))
  .delete(controller.deleteByID(OperatorNotificationModel));

export default router;
