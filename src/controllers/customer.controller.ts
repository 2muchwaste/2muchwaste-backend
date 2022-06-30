import { Request, Response } from 'express';
import { CustomerModel } from '../models/customer.model';

const mongoose = require('mongoose');
const Customer = require('../models/customer.model.ts')(mongoose);

exports.getCustomers = function (req: Request, res: Response) {
  Customer.find({}, function (err: String, user: CustomerModel) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.getCustomerByID = function (req: Request, res: Response) {
  Customer.findById(req.params.id, function (err: String, user: CustomerModel) {
    if (err) res.send(err);
    else {
      if (user == null) res.status(404).send('Customer not found');
      else res.json(user);
    }
  });
};

exports.updateCustomer = function (req: Request, res: Response) {
  Customer.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err: String, user: CustomerModel) {
      if (err) res.send(err);
      else {
        if (user == null) res.status(404).send('Customer not found');
        else res.json(user);
      }
    }
  );
};

exports.createCustomer = function (req: Request, res: Response) {
  const new_user = new Customer(req.body);
  new_user.save(function (err: String, user: CustomerModel) {
    if (err) res.send(err);
    res.status(201).json(user);
  });
};

exports.deleteCustomer = function (req: Request, res: Response) {
  Customer.deleteOne(
    { _id: req.params.id },
    function (err: String, result: { deletedCount: number }) {
      if (err) res.send(err);
      else {
        if (result.deletedCount == 0)
          res.status(404).send('Customer not found');
        else res.json('Customer successfully deleted');
      }
    }
  );
};
