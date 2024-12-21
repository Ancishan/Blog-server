import auth from '../../middleware/Auth';
import USER_ROLES from '../User/user.const';
import validateRequest from '../../middleware/validateRequest';
import BlogControllers from './blog.controller';
import BlogValidations from './blog.validation';
import express from 'express';


const router = express.Router();

router
  .route('/')
  .post(
    auth(USER_ROLES.user),
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createABlog,
  )
  .get(BlogControllers.getAllBlogs);

router
  .route('/:id')
  .get(BlogControllers.getABlog)
  .patch(
    auth(USER_ROLES.user),
    validateRequest(BlogValidations.updateBlogValidationSchema),
    BlogControllers.updateABlog,
  )
  .delete(auth(USER_ROLES.user), BlogControllers.deleteABlog);

export const BlogRoutes = router;
