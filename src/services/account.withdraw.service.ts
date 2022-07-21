import prisma from '../prisma/prismaClient';

class WithdrawTransactionService {
  async execute({ id, amount, type }: ITransaction) {
    const [result] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          customerId: id,
          amount,
          type,
        },
      }),
      prisma.customer.update({
        where: {
          id,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      }),
    ]);

    return [result];
  }
}

export default new WithdrawTransactionService();
