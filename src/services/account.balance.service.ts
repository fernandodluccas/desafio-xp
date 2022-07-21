import prisma from '../prisma/prismaClient';

class AccountBalanceService {
  async execute(id: string) {
    const balance = await prisma.customer.findFirst({
      where: { id },
      select: { id: true, balance: true },
    });

    return balance;
  }
}

export default new AccountBalanceService();
