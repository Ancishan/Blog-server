import express from 'express';

import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.valiadation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router
  .route('/register')
  .post(
    validateRequest(AuthValidations.registeredUserValidationSchema),
    AuthControllers.registerUser,
  );

router
  .route('/login')
  .post(
    validateRequest(AuthValidations.loginValidationSchema),
    AuthControllers.loginUser,
  );

export const AuthRoutes = router;