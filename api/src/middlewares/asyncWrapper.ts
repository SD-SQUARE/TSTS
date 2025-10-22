// asyncWrapper.ts (ESM)
import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncHandler<P = any, ResBody = any, ReqBody = any, ReqQuery = any> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>
) => Promise<unknown> | unknown;

const asyncWrapper = <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
  fn: AsyncHandler<P, ResBody, ReqBody, ReqQuery>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
};

export default asyncWrapper;
