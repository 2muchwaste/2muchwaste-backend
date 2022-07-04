import { CustomerModel } from '../models/customer.model';
import BasicService from '../services/basic.service';
import UserAuthService from '../services/userAuth.service';

const mongoose = require('mongoose');
const Customer = require('../models/customer.model')(mongoose);
const basicService = new BasicService<CustomerModel>('Customer');
const userService = new UserAuthService<CustomerModel>('Customer');

export default class CustomerController {
  getCustomers = basicService.getAll(Customer);

  getCustomerByID = basicService.getByID(Customer);

  updateCustomer = basicService.updateByID(Customer);

  createCustomer = basicService.createOne(Customer);

  deleteCustomer = basicService.deleteByID(Customer);

  signup = userService.signUp(Customer);

  login = userService.login(Customer);
}
