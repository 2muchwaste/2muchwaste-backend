import { OperatorModel } from '../models/operator.model';
import BasicService from '../services/basic.service';

const mongoose = require('mongoose');
const Operator = require('../models/operator.model')(mongoose);
const controller = new BasicService<OperatorModel>('Operator');

export default class OperatorController {
  getOperators = controller.getAll(Operator);

  getOperatorByID = controller.getByID(Operator);

  createOperator = controller.createOne(Operator);

  updateOperator = controller.updateByID(Operator);

  deleteOperator = controller.deleteByID(Operator);
}
