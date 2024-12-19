import express from "express";
import { userController } from "./user.controller";


const UserRouter = express.Router();

// Login route
UserRouter.post('/register', userController.createUser);

export default UserRouter;
