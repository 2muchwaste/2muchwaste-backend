import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { signUpHandlers } from '../utils/constants';

const router: Router = express.Router();
const controller = new AuthController();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});

router.route('/:role/signin').post(controller.signIn());
router.route('/:role/signout').post(controller.signOut());
router.post('/:role/signup', signUpHandlers, controller.signUp());

export default router;
