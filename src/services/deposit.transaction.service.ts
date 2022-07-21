import prisma from '../prisma/prismaClient';

class DepositTransactionService {
  async execute({ id, amount, type }: ITransaction) {
    const result = await prisma.$transaction([
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
            increment: amount,
          },
        },
      }),
    ]);

    return result;
  }
}
