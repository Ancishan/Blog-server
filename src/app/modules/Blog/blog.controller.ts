
import catchAsync from '../Utils/catchAsync';
import sendResponse from '../Utils/sendRequest';
import BlogServices from './blog.service';

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    result: result.length,
    message: 'Get all Blog SuccessFully',
    data: result,
  });
});

const getABlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getABlogFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog fetched SuccessFully!',
    data: result,
  });
});

const createABlog = catchAsync(async (req, res) => {
  const { user: userData } = req;
  const result = await BlogServices.createABlogInDB(req.body, userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blogs created sucessfully!',
    data: result,
  });
});

const updateABlog = catchAsync(async (req, res) => {
  const { user: userData } = req;
  const { id } = req.params;

  const result = await BlogServices.updateABlogInDB(id, userData, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated SuccessFully!',
    data: result,
  });
});

const deleteABlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user: userData } = req;

  const result = await BlogServices.deleteABlogFromDB(id, userData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted SuccessFully!',
    data: result,
  });
});

const BlogControllers = {
  getAllBlogs,
  getABlog,
  updateABlog,
  createABlog,
  deleteABlog,
};

export default BlogControllers;
