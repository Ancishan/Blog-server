import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';


const router = Router();

const moduleRoutes = [
//   {
//     path: '/blogs',
//     route: BlogRoutes,
//   },
  {
    path: '/auth',
    route: AuthRoutes,
  },
//   {
//     path: '/admin',
//     route: AdminRoutes,
//   },
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;