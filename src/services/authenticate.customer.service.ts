import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import CustomError from '../errors/custom.error';
import IUser from '../interfaces/ICustomer';
import prisma from '../prisma/prismaClient';

class AuthenticateCustomerService {
  async execute({ email, password }: IUser): Promise<string> {
    const customer = await prisma.customer.findFirst({
      where: { email },
    });

    if (!customer) {
      throw new CustomError('Email or password invalid', 403);
    }

    const isPasswordValid = await compare(password, customer.password);

    if (!isPasswordValid) {
      throw new CustomError('Email or password invalid', 403);
    }

    const token = sign({}, process.env.JWT_KEY as string, { expiresIn: '15m' });

    return token;
  }
}

export default new AuthenticateCustomerService();
