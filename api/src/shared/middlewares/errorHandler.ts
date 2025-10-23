import { Request, Response, NextFunction } from "express";
import { SystemError, ValidationError } from "../../utils/customErrors.js";
import ApiResponse from "../../utils/baseApiResponse.js";
import { validationResult } from "express-validator";

export const appErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle validation errors
  if (err instanceof ValidationError) {
    const response = new ApiResponse(null, null, err.validationErrors.message);
    return res.status(400).json(response);
  }

  // Handle system errors
  if (err instanceof SystemError) {
    const response = new ApiResponse(err.code, null);
    return res.status(400).json(response);
  }

  next(err);
};

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errMsgs = errors.array().map((err: any) => err.msg);
    throw new ValidationError({ message: errMsgs });
  }

  next();
};
