import IUser from '../interface/ICustomer';
import prisma from '../prisma/prismaClient';

class CreateCustomerService {
  async execute({ name, email, password }: IUser): Promise<IUser> {
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        password,
      },
    });

    return customer;
  }
}

export default new CreateCustomerService();
