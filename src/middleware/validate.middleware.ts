import { ZodTypeAny } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validate =
  (schema: ZodTypeAny): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    const toValidate = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const result = schema.safeParse(toValidate);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      res.status(400).json({ message: "Validasi gagal", errors: fieldErrors });
      return;
    }

    req.body = result.data.body;
    req.params = result.data.params;
    req.query = result.data.query;

    return next();
  };
