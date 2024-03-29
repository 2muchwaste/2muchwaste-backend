import BaseController from './base.controller';
import PaymentModel, { IPayment } from '../models/payment.model';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { PaymentStatus } from '../enums/PaymentStatus';

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
    const status = req.body.status;
    model.findByIdAndUpdate(
      req.params.id,
      { $set: { status: status } },
      (err: String, doc: Model<IPayment>) => {
        if (err) res.send(err);
        else {
          if (status == PaymentStatus.COMPLETE)
            this.setPaymentDate(PaymentModel, req, res);
          else res.json(doc);
        }
      }
    );
  };
  setPaymentDate = (model: Model<IPayment>, req: Request, res: Response) => {
    model.findByIdAndUpdate(
      req.params.id,
      { $set: { paymentDate: new Date().toISOString() } },
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
        // { status: 1, _id: 0 },
        (err: String, doc: Model<IPayment>) => {
          if (err) res.send(err);
          else res.json(doc);
        }
      );
    };
}
