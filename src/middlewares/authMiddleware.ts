import { NextFunction, Request, Response } from 'express';
import { response_unauthorized } from '$utils/response.utils';
import jwt from '../utils/jwt.utils';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token)
    return response_unauthorized(res, 'No token provided');

  try {
    const data = jwt.verify(token);
    res.locals.payload = data;
    return next();
  } catch {
    return response_unauthorized(res);
  }
};