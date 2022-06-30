import express, { Router } from 'express';

const router: Router = express.Router();
const userController = require('../controllers/customer.controller');

router.route('/:id').get(userController.getUserByID);

export default router;
