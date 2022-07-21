import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const customerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    await customerSchema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
};
