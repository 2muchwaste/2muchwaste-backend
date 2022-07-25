import express, { Router } from 'express';
import OperatorNotificationController from '../controllers/operatorNotification.controller';
import OperatorNotificationModel from '../models/operatorNotification.model';
import { operatorHandlers } from '../utils/constants';

const router: Router = express.Router();
const controller = new OperatorNotificationController('OperatorNotification');

router.use(operatorHandlers);

router
  .route('/')
  .get(controller.getAll(OperatorNotificationModel))
  .post(controller.createNotification(OperatorNotificationModel));
router
  .route('/:id')
  .get(controller.getByID(OperatorNotificationModel))
  .patch(controller.updateByID(OperatorNotificationModel))
  .delete(controller.deleteByID(OperatorNotificationModel));
router
  .route('/status/pending')
  .get(controller.getPendingNotifications(OperatorNotificationModel));
router
  .route('/status/inprogress')
  .get(controller.getInProgressNotifications(OperatorNotificationModel));
router
  .route('/status/complete')
  .get(controller.getCompletedNotifications(OperatorNotificationModel));
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
