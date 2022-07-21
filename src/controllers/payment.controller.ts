import BaseController from './base.controller';
import { IPayment } from '../models/payment.model';
import { Model } from 'mongoose';
import { Request, Response } from 'express';

export default class PaymentController extends BaseController<IPayment> {
  getStatus = (model: Model<IPayment>) => (req: Request, res: Response) => {
    model.findById(
      req.params.id,
      { status: 1, _id: 0 },
      (err: String, doc: Model<IPayment>) => {
        if (err) res.send(err);
        else res.json(doc);
      }
    );
  };
  setStatus = (model: Model<IPayment>) => (req: Request, res: Response) => {
    model.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      (err: String, doc: Model<IPayment>) => {
        if (err) res.send(err);
        else res.json(doc);
      }
    );
  };
  getUserInvoices =
    (model: Model<IPayment>) => (req: Request, res: Response) => {
      model.find(
        { userID: req.params.userid },
        { status: 1, _id: 0 },
        (err: String, doc: Model<IPayment>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
}
