import prisma from '../prisma/prismaClient';

class AssetsCustomerService {
  async execute(customerId: string) {
    const assets = await prisma.customerStock.findMany({
      where: {
        customerId: customerId,
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
  }
}

export default new AssetsCustomerService();
