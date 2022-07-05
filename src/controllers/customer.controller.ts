import CustomerModel, { ICustomer } from '../models/customer.model';
import UserService from '../services/user.service';
import UserAuthService from '../services/userAuth.service';

const mongoose = require('mongoose');
const userService = new UserService<ICustomer>('Customer');
const authService = new UserAuthService<ICustomer>('Customer');

export default class CustomerController {
  getCustomers = userService.getAll(CustomerModel);
  getCustomerByID = userService.getByID(CustomerModel);
  updateCustomer = userService.updateByID(CustomerModel);
  createCustomer = userService.createOne(CustomerModel);
  deleteCustomer = userService.deleteByID(CustomerModel);
  signup = authService.signUp(CustomerModel);
  login = authService.login(CustomerModel);
}
