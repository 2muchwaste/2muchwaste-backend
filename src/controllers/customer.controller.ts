import CustomerModel, { ICustomer } from '../models/customer.model';
import UserService from '../services/user.service';

const service = new UserService<ICustomer>('Customer');

export default class CustomerController {
  getCustomers = service.getAll(CustomerModel);
  getCustomerByID = service.getByID(CustomerModel);
  updateCustomer = service.updateByID(CustomerModel);
  createCustomer = service.createOne(CustomerModel);
  deleteCustomer = service.deleteByID(CustomerModel);
  signup = service.signUp(CustomerModel);
  login = service.login(CustomerModel);
}
