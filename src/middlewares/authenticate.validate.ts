import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const authenticateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    await authenticateSchema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
};
