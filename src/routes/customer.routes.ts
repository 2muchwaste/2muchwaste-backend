import express, { Router } from 'express';
import CustomerController from '../controllers/customer.controller';
import CustomerModel from '../models/customer.model';
import { Roles } from '../enums/Roles';
import { adminHandlers, customerHandlers } from '../utils/constants';
const router: Router = express.Router();

const customerController = new CustomerController(Roles.CUSTOMER.toString());

router.get('/:id', customerHandlers, customerController.getByID(CustomerModel));
router.put(
  '/:id',
  customerHandlers,
  customerController.updateByID(CustomerModel)
);
router.delete(
  '/:id',
  customerHandlers,
  customerController.deleteByID(CustomerModel)
);
router.get(
  '/:cf/notifications',
  customerHandlers,
  customerController.getNotifications(CustomerModel)
);
router.post(
  '/:cf/notifications',
  customerHandlers,
  customerController.addNotification(CustomerModel)
);
router.put(
  '/:cf/notifications/:id',
  customerHandlers,
  customerController.readNotification(CustomerModel)
);
router.get('/', adminHandlers, customerController.getAll(CustomerModel));
export default router;
