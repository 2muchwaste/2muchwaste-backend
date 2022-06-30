import express, { Router } from 'express';
import CustomerController from '../controllers/customer.controller';
const router: Router = express.Router();

const customerController = new CustomerController();

router
  .route('/')
  .get(customerController.getCustomers)
  .post(customerController.createCustomer);
router
  .route('/:id')
  .get(customerController.getCustomerByID)
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

export default router;
