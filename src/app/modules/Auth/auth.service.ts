import { IUser } from '../User/user.interface';
import User from '../User/user.model';
import { ILogin } from './auth.interface';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import config from '../../config';


const registerUserInDB = async (payload: IUser) => {
  return await User.create(payload);
};

const LoginUserFromDB = async (payload: ILogin) => {
  //CHECK IF THE USER IS EXISTS
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) throw new AppError(401, 'Invalid credentials!');

  //CHECK IF THE PASSWORD IS CORRECT
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (user && !isPasswordMatched)
    throw new AppError(401, 'Invalid credentials!');

  //CHECK IF THE USER IS BLOCKED
  if (user && user.isBlocked)
    throw new AppError(403, 'This user is not authorized!');

  // CREATING AND SENDING TOKEN BACK  TO THE CLIENT
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expires as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expires as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registerUserInDB,
  LoginUserFromDB,
};