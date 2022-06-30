import express, { Router } from 'express';
import CustomerController from '../controllers/customer.controller';
const router: Router = express.Router();

const customerController = new CustomerController();

router.route('/:id').get(customerController.getCustomerByID);

export default router;
