import { JwtPayload } from "jsonwebtoken";
import User from "./user.model";
import AppError from "../../errors/AppError";
import USER_ROLES from "./user.const";

const allUsersDB = async (userData: JwtPayload) =>{
    // check admin is exists?
    const admin = await User.isUserExistsByEmail(userData.email);
    if(!admin) throw new AppError(403, "User does not exist!");

    if(admin && admin.role !== USER_ROLES.admin)
        throw new AppError(403, 'You are not authorized for this action');
    return await User.find();
};

export const UserService = {
    allUsersDB
};