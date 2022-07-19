import BaseController from './base.controller';
import { IArea } from '../models/area.model';
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
        { streets: 1, _id: 0 },
        (err: String, doc: Model<IArea>) => {
          if (err) res.send(err);
          res.json(doc);
        }
      );
    };

  updateAreaByZipCode =
    (model: Model<IArea>) => async (req: Request, res: Response) => {
      model.findOneAndUpdate(
        { zipCode: req.params.zipCode },
        req.body,
        { new: true, runValidators: true },
        (err, doc) => {
          if (err) res.send(err);
          else {
            if (doc == null) res.status(404).send('Doc not found');
            else res.json(doc);
          }
        }
      );
    };

  updateAreaByZipCodeAndName =
    (model: Model<IArea>) => async (req: Request, res: Response) => {
      model.findOneAndUpdate(
        { zipCode: req.params.zipCode, name: req.params.districtName },
        req.body,
        { new: true, runValidators: true },
        (err, doc) => {
          if (err) res.send(err);
          else {
            if (doc == null) res.status(404).send('Doc not found');
            else res.json(doc);
          }
        }
      );
    };

  addStreetToArea =
    (model: Model<IArea>) => async (req: Request, res: Response) => {
      model.findOneAndUpdate(
        { zipCode: req.params.zipCode, name: req.params.districtName },
        { $addToSet: { streets: req.body.street.toString() } },
        { new: true, runValidators: true },
        (err, doc) => {
          if (err) res.send(err);
          else {
            if (doc == null) res.status(404).send('Doc not found');
            else res.json(doc);
          }
        }
      );
    };

  deleteByZipCode =
    (model: Model<IArea>) => async (req: Request, res: Response) => {
      model.findOneAndDelete(
        { zipCode: req.params.zipCode },
        (err: String, result: { deletedCount: number }) => {
          if (err) res.send(err);
          else {
            if (result.deletedCount === 0)
              res.status(404).send('Doc not found');
            else res.json('Doc successfully deleted');
          }
        }
      );
    };

  deleteByZipCodeAndName =
    (model: Model<IArea>) => async (req: Request, res: Response) => {
      model.findOneAndDelete(
        { zipCode: req.params.zipCode, name: req.params.districtName },
        (err: String, result: { deletedCount: number }) => {
          if (err) res.send(err);
          else {
            if (result.deletedCount === 0)
              res.status(404).send('Doc not found');
            else res.json('Doc successfully deleted');
          }
        }
      );
    };
}
