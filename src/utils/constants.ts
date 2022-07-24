import {
  isAdmin,
  isCustomer,
  isOperator,
  verifyToken,
} from '../middlewares/authJwt';
import { verifySignUp } from '../middlewares/verifySignUp';

export const customerHandlers = [verifyToken, isCustomer];
// export const customerHandlers = verifyToken;
export const operatorHandlers = [verifyToken, isOperator];
export const adminHandlers = [verifyToken, isAdmin];
export const signUpHandlers = [
  verifySignUp.checkDuplicateEmail,
  verifySignUp.checkRoleExists,
];
