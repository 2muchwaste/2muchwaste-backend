import BaseController from './base.controller';
import DepositsModel, { IDeposit } from '../models/deposits.model';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import CostModel, { ICost } from '../models/cost.model';
import DumpsterModel, { IDumpster } from '../models/dumpster.model';

export default class DepositController extends BaseController<IDeposit> {
  createDeposit =
    (_model: Model<IDeposit>) => async (req: Request, res: Response) => {
      DumpsterModel.findByIdAndUpdate(
        req.body.dumpsterID,
        { $inc: { actualWeight: req.body.quantity } },
        (dumpErr: String, dumpDoc: IDumpster) => {
          CostModel.findOne(
            { type: dumpDoc.type },
            { pricePerKilogram: 1, _id: 0 },
            (costErr: String, costDoc: ICost) => {
              if (costErr) res.send(costErr);
              const newDoc = new DepositsModel({
                date: new Date().toISOString(),
                quantity: req.body.quantity,
                type: dumpDoc.type,
                price: req.body.quantity * costDoc.pricePerKilogram,
                openingTimeSeconds: req.body.openingTimeSeconds,
                dumpsterID: req.body.dumpsterID,
                userID: req.body.userID,
              });
              newDoc.save((err: String, doc: Model<IDeposit>) => {
                console.log('save:' + doc);
                if (err) res.send(err);
                res.status(201).json(doc);
              });
            }
          );
        }
      );
    };
  getDepositsFromDumpster =
    (model: Model<IDeposit>) => async (req: Request, res: Response) => {
      model.find(
        { dumpsterID: req.params.id },
        (err: String, doc: Model<IDeposit>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };
}
