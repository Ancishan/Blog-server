import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import config from '../config';
import { TErrSources } from '../interface/error';
import handleZodErr from '../errors/handleZodError';
import handleValidationError from '../errors/handlevalidationError';
import handleCastErr from '../errors/handleCastError';
import handleDuplicateErr from '../errors/handleDuplicateError';

const globalErrHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 400;
  let message = 'Something went wrong';
  let errSources: TErrSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErr = handleZodErr(err);
    statusCode = simplifiedErr?.statusCode;
    message = simplifiedErr?.message;
    errSources = simplifiedErr?.errSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedErr = handleValidationError(err);
    statusCode = simplifiedErr?.statusCode;
    message = simplifiedErr?.message;
    errSources = simplifiedErr?.errSources;
  } else if (err?.name === 'CastError') {
    const simplifiedErr = handleCastErr(err);
    statusCode = simplifiedErr?.statusCode;
    message = simplifiedErr?.message;
    errSources = simplifiedErr?.errSources;
  } else if (err?.code === 11000) {
    const simplifiedErr = handleDuplicateErr(err);
    statusCode = simplifiedErr?.statusCode;
    message = simplifiedErr?.message;
    errSources = simplifiedErr?.errSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // FINAL RETURN
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errSources,
    err,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });

  // Explicitly return void to satisfy the ErrorRequestHandler type
  return;
};

export default globalErrHandler;
