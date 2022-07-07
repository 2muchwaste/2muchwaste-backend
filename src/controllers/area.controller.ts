import BaseController from './base.controller';
import AreaModel, { IArea } from '../models/area.model';
import { Model } from 'mongoose';
import { Request, Response } from 'express';

export default class AreaController extends BaseController<IArea> {
  // getDistrictsFromArea =
  //   (model: Model<IAreas>) => async (req: Request, res: Response) => {
  //     model.findOne({ zipCode: req.params.zipCode });
  //   };
}
