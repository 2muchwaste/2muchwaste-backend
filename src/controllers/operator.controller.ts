import OperatorModel, { IOperator } from '../models/operator.model';
import UserService from '../services/user.service';
import { Roles } from '../enums/Roles';

const mongoose = require('mongoose');
const service = new UserService<IOperator>(Roles.OPERATOR.toString());

export default class OperatorController {
  getOperators = service.getAll(OperatorModel);
  getOperatorByID = service.getByID(OperatorModel);
  createOperator = service.createOne(OperatorModel);
  updateOperator = service.updateByID(OperatorModel);
  deleteOperator = service.deleteByID(OperatorModel);
}
