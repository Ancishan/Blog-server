import { Router } from "express";
import UserRouter from "../modules/User/user.route";


const router = Router();

const moduleRoutes = [
    {
     path:'/auth',
     routes:UserRouter,
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;