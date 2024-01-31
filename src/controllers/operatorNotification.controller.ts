import BaseController from './base.controller';
import OperatorNotificationModel, {
  IOperatorNotification,
} from '../models/operatorNotification.model';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { NotificationStatus } from '../enums/NotificationStatus';
import OperatorNotificationService from '../services/operatorNotification.service';
import { DumpsterErrorTypes } from '../enums/DumpsterErrorTypes';

export default class OperatorNotificationController extends BaseController<IOperatorNotification> {
  service = new OperatorNotificationService();
  createNotification =
    (_model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      const newDoc = new OperatorNotificationModel({
        dumpsterID: req.body.dumpsterID,
        date: new Date().toISOString(),
        type: req.body.type,
        status: NotificationStatus.PENDING,
      });
      newDoc.save((err: String, doc: Model<IOperatorNotification>) => {
        if (err) res.send(err)
        else{
          const io = req.app.get('socketio')
          io.emit('operators', doc)
          res.status(201).json(doc);
        }
      });
    };
  getPendingNotifications =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      model.find(
        { status: NotificationStatus.PENDING.toString() },
        (err: String, doc: Model<IOperatorNotification>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
  getInProgressNotifications =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      model.find(
        { status: NotificationStatus.IN_PROGRESS.toString() },
        (err: String, doc: Model<IOperatorNotification>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
  getCompletedNotifications =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      model.find(
        { status: NotificationStatus.COMPLETE.toString() },
        (err: String, doc: Model<IOperatorNotification>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
  getNotificationsByProblemFull =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      this.service.getNotificationError(
        model,
        req,
        res,
        DumpsterErrorTypes.FULL
      );
    };
  getNotificationsByProblemPhy =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      this.service.getNotificationError(
        model,
        req,
        res,
        DumpsterErrorTypes.PHYSICAL_PROBLEM
      );
    };
  getNotificationsByProblemObstruction =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      this.service.getNotificationError(
        model,
        req,
        res,
        DumpsterErrorTypes.OBSTRUCTION
      );
    };
  getNotificationsByProblemError =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      this.service.getNotificationError(
        model,
        req,
        res,
        DumpsterErrorTypes.ERROR
      );
    };
  getStatus =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      model.findById(
        req.params.id,
        { status: 1, _id: 0 },
        (err: String, doc: Model<IOperatorNotification>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
  setStatus =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      model.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        (err: String, doc: Model<IOperatorNotification>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
  getOperator =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      model.findById(
        req.params.id,
        { managedByOperator: 1, _id: 0 },
        (err: String, doc: Model<IOperatorNotification>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
  setOperator =
    (model: Model<IOperatorNotification>) => (req: Request, res: Response) => {
      model.findByIdAndUpdate(
        req.params.id,
        { $set: { managedByOperator: req.body.operatorID } },
        (err: String, doc: Model<IOperatorNotification>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
}
