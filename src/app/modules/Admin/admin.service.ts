import { JwtPayload } from 'jsonwebtoken';

import AppError from '../../errors/AppError';
import User from '../User/user.model';
import Blog from '../Blog/blog.model';


const blockUserInDB = async (id: string, userData: JwtPayload) => {
  //CHECK IF THE ADMIN IS EXISTS
  const admin = await User.isUserExistsByEmail(userData.email);

  if (!admin) throw new AppError(403, 'User does not exist!');

  //CHECK IF THE USER IS EXISTS
  const user = await User.findById(id);

  if (!user) throw new AppError(400, 'This user does not exists!');

  //CHECK IF THE USER IS BLOCKED
  if (user && user.isBlocked)
    throw new AppError(403, 'This user is already blocked!');

  // FINAL UPDATE
  return await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

const deleteBlogFromDB = async (id: string, userData: JwtPayload) => {
  //CHECK IF THE ADMIN IS EXISTS
  const admin = await User.isUserExistsByEmail(userData.email);

  if (!admin) throw new AppError(403, 'User does not exist!');

  //CHECK IF THE BLOG IS EXISTS
  const blog = await Blog.isBlogExistsById(id);

  if (!blog) throw new AppError(400, 'This blog does not exists!');

  // FINAL DELETE
  return await Blog.findByIdAndDelete(id);
};

export const AdminServices = {
  blockUserInDB,
  deleteBlogFromDB,
};
