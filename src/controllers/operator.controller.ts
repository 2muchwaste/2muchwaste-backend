import OperatorModel, { IOperator } from '../models/operator.model';
import UserService from '../services/user.service';
import { Roles } from '../enums/Roles';
import CustomerModel from '../models/customer.model';

const service = new UserService<IOperator>(Roles.OPERATOR.toString());

export default class OperatorController {
  getOperators = service.getAll(OperatorModel);
  getOperatorByID = service.getByID(OperatorModel);
  createOperator = service.createOne(OperatorModel);
  updateOperator = service.updateByID(OperatorModel);
  deleteOperator = service.deleteByID(OperatorModel);
  signup = service.signUp(CustomerModel);
  login = service.login(CustomerModel);
}
