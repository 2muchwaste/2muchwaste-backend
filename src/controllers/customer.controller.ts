import { ICustomer } from '../models/customer.model';
import UserController from './user.controller';
import { Model } from 'mongoose';
import { Request, Response } from 'express';

export default class CustomerController extends UserController<ICustomer> {
  getNotifications =
    (model: Model<ICustomer>) => async (req: Request, res: Response) => {
      model.findOne(
        { cf: req.params.cf },
        { notifications: 1, _id: 0, __t: 0 },
        (err: String, doc: Model<ICustomer>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };
  addNotification =
    (model: Model<ICustomer>) => async (req: Request, res: Response) => {
      let notification;
      if (req.body.hasOwnProperty('depositID'))
        notification = {
          date: new Date().toISOString(),
          text: req.body.text,
          read: false,
          depositID: req.body.depositID,
        };
      else
        notification = {
          date: new Date().toISOString(),
          text: req.body.text,
          read: false,
        };
      model.findOneAndUpdate(
        { cf: req.params.cf },
        {
          $addToSet: {
            notifications: notification,
          },
        },
        (err: String, doc: Model<ICustomer>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
}
