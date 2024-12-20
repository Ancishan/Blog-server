import { Request, Response } from "express";

import catchAsync from "../Utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../Utils/sendRequest";

const createUser = catchAsync(async(req, res) =>{
    const {user: userData} = req;
    const result = await UserService.allUsersDB(userData);

    sendResponse(res, {
        success:true,
        statusCode:200,
        message:"user get successfully",
        data: result,
    });
});

export const userController = {
    createUser
};