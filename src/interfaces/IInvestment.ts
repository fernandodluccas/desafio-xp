interface IInvestment {
  customerId: string;
  symbol: string;
  action: 'BUY' | 'SELL';
  status: 'OPEN' | 'CLOSED';
  quantity: number;
  price: number;
}

export default IInvestment;
