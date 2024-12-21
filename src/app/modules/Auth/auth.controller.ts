import config from '../../config';
import catchAsync from '../Utils/catchAsync';
import sendResponse from '../Utils/sendRequest';

import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserInDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'User registered successfully!',
    statusCode: 201,
    data: {
      _id: result?._id,
      name: result?.name,
      email: result?.email,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.LoginUserFromDB(req.body);

  const { refreshToken, accessToken } = result;

  // STORING REFRESHTOKEN IN COOKIES
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User logged in successfully!',
    data: {
      token: accessToken,
    },
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
};