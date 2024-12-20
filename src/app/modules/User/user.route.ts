import express from 'express';
import auth from '../../middleware/Auth';
import USER_ROLES from './user.const';
import { userController } from './user.controller';


const router = express.Router();

router.route('/').get(auth(USER_ROLES.admin), userController.createUser);

export const UserRoutes = router;