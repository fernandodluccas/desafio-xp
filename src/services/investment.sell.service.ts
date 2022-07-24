import CustomError from '../errors/custom.error';
import IInvestment from '../interfaces/IInvestment';
import prisma from '../prisma/prismaClient';

class InvestmentSellService {
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

    const buyOrder = await prisma.order.findFirst({
      where: {
        stockId: stock.id,
        action: 'BUY',
        status: 'OPEN',
        price: {
          lte: price,
        },
      },
    });

    const sellerCustomerStock = await prisma.customerStock.findFirst({
      where: {
        customerId,
        stock: {
          symbol,
        },
      },
    });

    console.log({ sellerCustomerStock });

    if (!sellerCustomerStock) {
      throw new CustomError('You do not have this stock', 404);
    }

    if (buyOrder) {
      if (Number(buyOrder.quantity) > Number(sellerCustomerStock.quantity)) {
        throw new CustomError("You don't have enough stocks", 400);
      }

      const buyerCustomerStock = await prisma.customerStock.findFirst({
        where: {
          customerId: buyOrder.customerId,
          stockId: stock.id,
        },
      });
      if (!buyerCustomerStock) {
        throw new CustomError('Buyer does not have this stock', 404);
      }

      const sellOrder = await prisma.$transaction([
        prisma.order.update({
          where: {
            id: buyOrder.id,
          },
          data: {
            status: 'CLOSED',
          },
        }),
        prisma.customer.update({
          where: {
            id: customerId,
          },
          data: {
            balance: {
              increment: Number(buyOrder.price) * quantity,
            },
          },
        }),
        prisma.customerStock.update({
          where: {
            id: sellerCustomerStock.id,
          },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        }),
        prisma.customerStock.update({
          where: {
            id: buyerCustomerStock.id,
          },
          data: {
            quantity: {
              increment: quantity,
            },
          },
        }),
        prisma.customer.update({
          where: {
            id: buyOrder.customerId,
          },
          data: {
            balance: {
              decrement: Number(buyOrder.price) * quantity,
            },
          },
        }),
      ]);

      return sellOrder;
    } else {
      const sellOrder = await prisma.order.create({
        data: {
          customerId,
          stockId: stock.id,
          action,
          status: 'OPEN',
          quantity,
          price,
        },
      });

      return sellOrder;
    }
  }
}

export default new InvestmentSellService();
