import config from '../config';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRoles } from '../modules/User/user.interface';
import catchAsync from '../modules/Utils/catchAsync';
import User from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRoles[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    // CHECK IF THE TOKEN IS EXISTS
    if (!token) throw new AppError(403, 'You are not authorized!');

    // CHECK IF THE TOKEN IS VALID
    const decoded = jwt.verify(token, config.jwt_secret as string);

    const { role, email } = decoded as JwtPayload;

    //CHECK IF THE USER IS EXISTS
    const user = await User.isUserExistsByEmail(email);

    if (!user) throw new AppError(400, 'This user does not exists!');

    //CHECK IF THE USER IS BLOCKED
    if (user && user.isBlocked)
      throw new AppError(403, 'You are not authorized!');

    //CHECK IF THE USER ROLE IS CORRECT
    if (requiredRoles && !requiredRoles.includes(role))
      throw new AppError(403, 'You are not authorized');

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;