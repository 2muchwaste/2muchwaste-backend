import { IOperatorNotification } from '../models/operatorNotification.model';
import { Request, Response } from 'express';
import { DumpsterErrorTypes } from '../enums/DumpsterErrorTypes';
import { Model } from 'mongoose';

export default class OperatorNotificationService {
  getNotificationError = (
    model: Model<IOperatorNotification>,
    req: Request,
    res: Response,
    error: DumpsterErrorTypes
  ) => {
    model.find(
      { type: error },
      (err: String, doc: Model<IOperatorNotification>) => {
        if (err) res.send(err);
        else res.json(doc);
      }
    );
  };
}
