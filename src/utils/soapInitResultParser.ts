import { InitTransaction, InitTransactionResponse } from '../interfaces/initTransactionParser';

export const parseInitTransactionData = (initSoapResponse: InitTransactionResponse): InitTransaction => {
  const data = initSoapResponse.return;
  return {
    internalId: data['internal-id'],
    transactionId: data['transaction-id'],
    storeId: data['store-id'],
    paymentGatewayId: data['payment-gateway'].id,
    paymentGatewayName: data['payment-gateway'].name,
    transactionType: data['transaction-type'],
    customerName: data['customer-name'],
    customerSurname: data['customer-surname'],
    customerEmail: data['email'],
    modifiedDate: data['modified-date'],
    createdDate: data['create-date'],
    amount: data['amount'],
    currency: data['currency'],
    paymentId: data['payment-id'],
    transactionState: data['active-state'].type,
    activeState: data['active-state'].result,
  };
};
