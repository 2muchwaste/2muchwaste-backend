import BaseController from './base.controller';
import DepositsModel, { IDeposit } from '../models/deposits.model';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import OperatorNotificationModel, {
  IOperatorNotification,
} from '../models/operatorNotification.model';
import CostModel, { ICost } from '../models/cost.model';
import DumpsterModel, { IDumpster } from '../models/dumpster.model';
import CustomerModel, { ICustomer } from '../models/customer.model';
import { DumpsterErrorTypes } from '../enums/DumpsterErrorTypes';
import { NotificationStatus } from '../enums/NotificationStatus';
import DumpsterService from '../services/dumpster.service';

export default class DepositController extends BaseController<IDeposit> {
  createDeposit =
    (_model: Model<IDeposit>) => async (req: Request, res: Response) => {
      DumpsterModel.findByIdAndUpdate(
        req.body.dumpsterID,
        { $inc: { actualWeight: req.body.quantity } },
        (dumpErr: String, dumpDoc: IDumpster) => {
          if (((dumpDoc.actualWeight + req.body.quantity) / dumpDoc.maxWeight) >= dumpDoc.limitUsablePercentage / 100) {
            console.log("Dumpster full after this deposit, set false availability")
            const newOperatorNotification = new OperatorNotificationModel({
              dumpsterID: req.body.dumpsterID,
              date: new Date().toISOString(),
              type: DumpsterErrorTypes.FULL,
              status: NotificationStatus.PENDING,
            });
            newOperatorNotification.save((err: String, doc: Model<IOperatorNotification>) => {
              if (err) console.log(err)
            });
            DumpsterModel.findByIdAndUpdate(
              req.body.dumpsterID,
              {
                $set: { available: false },
              },
              { new: true },
              (dumpErr: string, dumpDoc: IDumpster) => {
                if (dumpErr) console.log(dumpErr);
              }
            )
          }
          CostModel.findOne(
            { type: dumpDoc.type },
            { pricePerKilogram: 1, _id: 0 },
            (costErr: String, costDoc: ICost) => {
              if (costErr) res.send(costErr);
              const newDoc = new DepositsModel({
                date: new Date().toISOString(),
                quantity: req.body.quantity,
                type: dumpDoc.type,
                price: this.getPrice(req.body.quantity, costDoc.pricePerKilogram),
                openingTimeSeconds: req.body.openingTimeSeconds,
                dumpsterID: req.body.dumpsterID,
                userID: req.body.userID,
              });
              newDoc.save((err: String, doc: Model<IDeposit>) => {
                if (err) res.send(err);
                let text =
                  'Deposited ' +
                  req.body.quantity +
                  'kg of ' +
                  dumpDoc.type +
                  ': ' +
                  this.getPrice(req.body.quantity, costDoc.pricePerKilogram) +
                  '€ (€/kg: ' +
                  costDoc.pricePerKilogram +
                  ')';
                CustomerModel.findByIdAndUpdate(
                  req.body.userID,
                  {
                    $addToSet: {
                      notifications: {
                        date: new Date().toISOString(),
                        text: text,
                        read: false,
                        depositID: newDoc.depositID,
                      },
                    },
                  },
                  { new: true },
                  (custErr: String, _custDoc: Model<ICustomer>) => {
                    if (custErr) res.send(custErr);
                    else {
                      const io = req.app.get('socketio')
                      // Send the user, with new notification
                      io.emit(io['userslogged'].get(req.body.userID), _custDoc)
                      res.status(201).json(doc);

                    }
                  }
                );
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
  getDepositsFromUser =
    (model: Model<IDeposit>) => async (req: Request, res: Response) => {
      model.find(
        { userID: req.params.id },
        (err: String, doc: Model<IDeposit>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };

  private getPrice(quantity: number, pricePerKilogram: number) {
    return Math.round(quantity * pricePerKilogram * 100) / 100
  }
}
