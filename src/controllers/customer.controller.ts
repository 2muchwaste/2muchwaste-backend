import { CustomerModel } from '../models/customer.model';
import ControllerFactory from '../utils/controller.factory';

const mongoose = require('mongoose');
const Customer = require('../models/customer.model')(mongoose);
const controller = new ControllerFactory<CustomerModel>('Customer');

export default class CustomerController {
  getCustomers = controller.getAll(Customer);

  getCustomerByID = controller.getByID(Customer);

  updateCustomer = controller.updateByID(Customer);

  createCustomer = controller.createOne(Customer);

  deleteCustomer = controller.deleteByID(Customer);
}
