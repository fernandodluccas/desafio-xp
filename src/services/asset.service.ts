import CustomError from '../errors/custom.error';
import prisma from '../prisma/prismaClient';

const isStockSymbol = (id: string): boolean => {
  return /^[A-Z0-9]{4}[0-9]{1,2}[F]?$/.test(id);
};

class AssetsService {
  async execute(id: string) {
    if (isStockSymbol(id)) {
      const stock = await prisma.stock.findFirst({
        where: {
          symbol: id,
        },
      });

      if (!stock) {
        throw new CustomError('Stock not found', 404);
      }

      const assets = await prisma.customerStock.findMany({
        where: {
          stockId: stock.id,
        },
        include: {
          stock: true,
        },
      });

      return assets.map((asset) => ({
        customerId: asset.customerId,
        symbol: asset.stock.symbol,
        quantity: asset.quantity,
        price: asset.price,
      }));
    } else {
      const assets = await prisma.customerStock.findMany({
        where: {
          customerId: id,
        },
        include: {
          stock: true,
        },
      });

      if (!assets) {
        throw new CustomError('Customer not found', 404);
      }

      return assets.map((asset) => ({
        customerId: asset.customerId,
        symbol: asset.stock.symbol,
        quantity: asset.quantity,
        price: asset.price,
      }));
    }
  }
}

export default new AssetsService();
