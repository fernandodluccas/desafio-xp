import CustomError from '../errors/custom.error';
import IInvestment from '../interfaces/IInvestment';
import prisma from '../prisma/prismaClient';

class InvestmentBuyService {
  async execute({ customerId, symbol, action, quantity, price }: IInvestment) {
    const stock = await prisma.stock.findFirst({
      where: { symbol },
    });

    if (!stock) {
      throw new CustomError('Stock does not exist', 404);
    }

    const customer = await prisma.customer.findFirst({
      where: { id: customerId },
    });

    if (!customer) {
      throw new CustomError('Customer does not exist', 404);
    }

    const sellOrder = await prisma.order.findFirst({
      where: {
        stockId: stock.id,
        action: 'SELL',
        status: 'OPEN',
        price: {
          lte: price,
        },
      },
    });

    if (sellOrder) {
      const totalValue =
        Number(sellOrder.price) * quantity > Number(customer.balance);

      if (Number(totalValue) > Number(customer.balance)) {
        throw new CustomError("You don't have enough balance", 400);
      }

      const buyercustomerStock = await prisma.customerStock.findFirst({
        where: {
          customerId,
          stockId: stock.id,
        },
      });

      const sellercustomerStock = await prisma.customerStock.findFirst({
        where: {
          customerId: sellOrder.customerId,
          stockId: stock.id,
        },
      });

      if (!sellercustomerStock) {
        throw new CustomError('Seller does not have this stock', 404);
      }

      const buyOrder = await prisma.$transaction([
        prisma.order.update({
          where: { id: sellOrder.id },
          data: {
            status: 'CLOSED',
          },
        }),
        prisma.customer.update({
          where: { id: sellOrder.customerId },
          data: {
            balance: {
              increment: Number(sellOrder.price) * quantity,
            },
          },
        }),
        prisma.customerStock.update({
          where: {
            id: sellercustomerStock.id,
          },
          data: {
            quantity: {
              decrement: sellOrder.quantity,
            },
          },
        }),
        buyercustomerStock
          ? prisma.customerStock.update({
              where: {
                id: buyercustomerStock!.id,
              },
              data: {
                quantity: {
                  increment: sellOrder.quantity,
                },
              },
            })
          : prisma.customerStock.create({
              data: {
                customerId,
                stockId: stock.id,
                quantity: sellOrder.quantity,
                price: sellOrder.price,
              },
            }),
        prisma.customer.update({
          where: { id: customerId },
          data: {
            balance: {
              decrement: Number(sellOrder.price) * quantity,
            },
          },
        }),
      ]);

      return buyOrder;
    } else {
      const buyOrder = await prisma.order.create({
        data: {
          customerId,
          stockId: stock.id,
          action,
          status: 'OPEN',
          quantity,
          price,
        },
      });

      return buyOrder;
    }
  }
}

export default new InvestmentBuyService();
