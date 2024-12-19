import { Request, Response } from "express";
import { UserServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    try {
        const createUser = req.body;
        const result = await UserServices.createUser(createUser);

        res.json({
            success: true,
            message: " User resgistered successfully",
            data: result,
        });

    } catch (error) {
        res.json({
            success: false,
            message: " A brief error message explaining what went wrong.",
            error,
        });

    }
}

export const userController = {
    createUser
};