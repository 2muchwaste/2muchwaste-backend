import { ICustomer } from '../models/customer.model';
import UserController from './user.controller';

export default class CustomerController extends UserController<ICustomer> {
  // Add here custom controls
}
