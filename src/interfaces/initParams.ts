export interface InitBodyData {
  'init-data': InitData;
}

export interface InitData {
  'store-id': string;
  'transaction-id': string;
  amount: number;
  currency: string;
  'status-url': string;
  'update-url': string;
  'transaction-type': string;
  'customer-name': string;
  'customer-surname': string;
  email: string;
  'gateway-id': string;
  'customer-address'?: string;
  'customer-city'?: string;
  'customer-post'?: string;
  'customer-country'?: string;
}

export interface Customer {
  'customer-name': string;
  'customer-surname': string;
  email: string;
  'customer-address'?: string;
  'customer-city'?: string;
  'customer-post'?: string;
  'customer-country'?: string;
}

export interface TransactionData {
  'status-url': string;
  'update-url': string;
  'transaction-type': string;
  'gateway-id'?: string;
}

export interface AmountData {
  amount: number;
  currency: string;
}

export interface OrderData {
  totalPrice: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postNumber: string;
}
