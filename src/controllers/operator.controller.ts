import { IOperator } from '../models/operator.model';
import UserController from './user.controller';
import { Request, Response } from 'express';
import AreaModel, { IArea } from '../models/area.model';
import { Model } from 'mongoose';
import DumpsterModel from '../models/dumpster.model';
import DumpsterService from '../services/dumpster.service';

export default class OperatorController extends UserController<IOperator> {
  getDistrictsFromOpCF =
    (model: Model<IOperator>) => async (req: Request, res: Response) => {
      model
        .find(
          { cf: req.params.cf },
          { districts: 1, _id: 0, __t: 0 },
          (err: String, doc: Model<IOperator>) => {
            if (err) res.send(err);
            res.json(doc);
          }
        )
        .populate('districts', '-__v');
    };

  addDistrictToOperator =
    (model: Model<IOperator>) => async (req: Request, res: Response) => {
      AreaModel.findOne(
        { zipCode: req.body.zipCode, name: req.body.name },
        (areaErr: String, areaDoc: Model<IArea>) => {
          model.findOneAndUpdate(
            { cf: req.params.cf },
            { $addToSet: { districts: areaDoc } },
            { new: true, runValidators: true },
            (err, doc) => {
              if (err) res.send(err);
              else {
                if (doc == null) res.status(404).send('Doc not found');
                else res.json(doc);
              }
            }
          );
        }
      );
    };

  getEmptiesFromOpCF =
    (model: Model<IOperator>) => async (req: Request, res: Response) => {
      model.find(
        { cf: req.params.cf },
        { empties: 1, _id: 0, __t: 0 },
        (err: String, doc: Model<IOperator>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };

  addEmptyToOperator =
    (model: Model<IOperator>) => async (req: Request, res: Response) => {
      const date = new Date();
      model.findOneAndUpdate(
        { cf: req.params.cf },
        {
          $addToSet: {
            empties: { date: date, dumpsterID: req.body.dumpsterID },
          },
        },
        { new: true, runValidators: true },
        (err, doc) => {
          if (err) res.send(err);
          else {
            if (doc == null) res.status(404).send('Doc not found');
            else {
              new DumpsterService().emptyDumpster(
                DumpsterModel,
                req.body.dumpsterID,
                res
              );
            }
          }
        }
      );
    };
}
