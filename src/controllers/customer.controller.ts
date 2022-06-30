import { CustomerModel } from '../models/customer.model';
import ControllerFactory from '../utils/controller.factory';

const mongoose = require('mongoose');
const Customer = require('../models/customer.model')(mongoose);
const controller = new ControllerFactory<CustomerModel>('Customer');

export default class CustomerController {
  getCustomers = controller.getAll(Customer);
  // getCustomers = (req: Request, res: Response) => {
  //   Customer.find({}, function (err: String, user: CustomerModel) {
  //     if (err) res.send(err);
  //     res.json(user);
  //   });
  // };

  getCustomerByID = controller.getByID(Customer);
  // getCustomerByID = (req: Request, res: Response) => {
  //   Customer.findById(
  //     req.params.id,
  //     function (err: String, user: CustomerModel) {
  //       if (err) res.send(err);
  //       else {
  //         if (user == null) res.status(404).send('Customer not found');
  //         else res.json(user);
  //       }
  //     }
  //   );
  // };
  updateCustomer = controller.updateByID(Customer);
  // updateCustomer = (req: Request, res: Response) => {
  //   Customer.findOneAndUpdate(
  //     { _id: req.params.id },
  //     req.body,
  //     { new: true },
  //     function (err: String, user: CustomerModel) {
  //       if (err) res.send(err);
  //       else {
  //         if (user == null) res.status(404).send('Customer not found');
  //         else res.json(user);
  //       }
  //     }
  //   );
  // };
  createCustomer = controller.createOne(Customer);
  // createCustomer = (req: Request, res: Response) => {
  //   const new_customer = new Customer(req.body);
  //   new_customer.save((err: String, customer: CustomerModel) => {
  //     if (err) res.send(err);
  //     res.status(201).json(customer);
  //   });
  // };
  deleteCustomer = controller.deleteByID(Customer);
  // deleteCustomer = (req: Request, res: Response) => {
  //   Customer.deleteOne(
  //     { _id: req.params.id },
  //     function (err: String, result: { deletedCount: number }) {
  //       if (err) res.send(err);
  //       else {
  //         if (result.deletedCount == 0)
  //           res.status(404).send('Customer not found');
  //         else res.json('Customer successfully deleted');
  //       }
  //     }
  //   );
  // };
}
