export interface InitTransactionResponse {
  return: {
    'internal-id': string;
    'transaction-id': string;
    'store-id': string;
    'payment-id': string;
    'payment-gateway': {
      id: string;
      name: string;
      description: string;
      'card-type': string[];
      instrument: string;
      language: string[];
      realtime: string;
      'supports-order-cancel': string;
      'supports-order': string;
      'supports-purchase-cancel': string;
      'supports-purchase': string;
      type: string;
    };
    'payment-instrument': string;
    'transaction-type': 'PURCHASE' | 'ORDER';
    'customer-name': string;
    'customer-surname': string;
    'customer-address': string;
    'customer-city': string;
    'customer-post': string;
    'customer-country': 'SI';
    'modified-date': string;
    'create-date': string;
    amount: string;
    currency: 'EUR';
    installments: string;
    email: string;
    'active-state': {
      type: 'INITIALIZING | PROCESSED | INITIALIZED';
      timestamp: string;
      amount: string;
      currency: 'EUR';
      result: string;
      'result-Type': 'REDIRECT';
    };
    states: { state: object };
  };
}

export interface InitTransaction {
  transactionId: string;
  internalId: string;
  storeId: string;
  paymentGatewayId: string;
  paymentGatewayName: string;
  transactionType: string;
  customerName: string;
  customerSurname: string;
  customerEmail: string;
  modifiedDate: string;
  createdDate: string;
  amount: string;
  currency: string;
  paymentId: string;
  transactionState: string;
  activeState: string;
}
