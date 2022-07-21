import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const assetSchema = Joi.object({
  id: Joi.alternatives()
    .try(Joi.string().regex(/^[A-Z0-9]{4}[0-9]{1,2}[F]?$/), Joi.string().uuid())
    .required(),
}).required();

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    await assetSchema.validateAsync(req.params);
    next();
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
};
