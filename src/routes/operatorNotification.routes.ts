import express, { Router } from 'express';
import OperatorNotificationController from '../controllers/operatorNotification.controller';
import OperatorNotificationModel from '../models/operatorNotification.model';

const router: Router = express.Router();
const controller = new OperatorNotificationController('OperatorNotification');

router
  .route('/')
  .get(controller.getAll(OperatorNotificationModel))
  .post(controller.createNotification(OperatorNotificationModel));
router
  .route('/:id')
  .get(controller.getByID(OperatorNotificationModel))
  .put(controller.updateByID(OperatorNotificationModel))
  .delete(controller.deleteByID(OperatorNotificationModel));
router
  .route('/pending')
  .get(controller.getPendingNotifications(OperatorNotificationModel));
router
  .route('/problems/full')
  .get(controller.getNotificationsByProblemFull(OperatorNotificationModel));
router
  .route('/problems/phy')
  .get(controller.getNotificationsByProblemPhy(OperatorNotificationModel));
router
  .route('/problems/obstruction')
  .get(
    controller.getNotificationsByProblemObstruction(OperatorNotificationModel)
  );
router
  .route('/problems/error')
  .get(controller.getNotificationsByProblemError(OperatorNotificationModel));

export default router;
