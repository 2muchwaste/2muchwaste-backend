import BaseController from './base.controller';
import AreaModel, { IArea } from '../models/area.model';
import { Model } from 'mongoose';
import { Request, Response } from 'express';

export default class AreaController extends BaseController<IArea> {
  getAreasFromZipCode =
    (model: Model<IArea>) => async (req: Request, res: Response) => {
      model.find(
        { zipCode: req.params.zipCode },
        (err: String, doc: Model<IArea>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };

  getAreaFromZipCodeAndName =
    (model: Model<IArea>) => async (req: Request, res: Response) => {
      model.findOne(
        { zipCode: req.params.zipCode, name: req.params.districtName },
        (err: String, doc: Model<IArea>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };

  updateAreaByZipCodeAndName =
    (model: Model<IArea>) => async (req: Request, _res: Response) => {
      model.findOneAndUpdate(
        { zipCode: req.params.zipCode, name: req.params.districtName },
        req.body,
        { new: true, runValidators: true },
        (err, doc, res) => {
          if (err) res.send(err);
          else {
            if (doc == null) res.status(404).send('Doc not found');
            else res.json(doc);
          }
        }
      );
    };
}
