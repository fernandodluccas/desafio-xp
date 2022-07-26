import ICustomer from '../interfaces/ICustomer';
import { hash } from 'bcrypt';
import prisma from '../prisma/prismaClient';
import CustomError from '../errors/custom.error';

interface IUser extends ICustomer {
  name: string;
}

class CreateCustomerService {
  async execute({ name, email, password }: IUser): Promise<ICustomer> {
    const customerExists = await prisma.customer.findFirst({
      where: { email },
    });

    if (customerExists) {
      throw new CustomError('Customer already exists', 409);
    }

    const hashedPassword = await hash(password, 8);

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return customer;
  }
}

export default new CreateCustomerService();
