import { OperatorModel } from '../models/operator.model';
import ControllerFactory from "../utils/controller.factory";

const mongoose = require('mongoose');
const Operator = require('../models/operator.model')(mongoose);
const controller = new ControllerFactory<OperatorModel>('Operator');

export default class OperatorController {
  getOperators = controller.getAll(Operator);

  getOperatorByID = controller.getByID(Operator);

  createOperator = controller.createOne(Operator);

  updateOperator = controller.updateByID(Operator);

  deleteOperator = controller.deleteByID(Operator);
}
