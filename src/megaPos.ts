import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { Config } from './interfaces/megaPos';
import { SoapConfig } from './interfaces/soapClient';
import { OrderData, InitBodyData, Customer, TransactionData, AmountData, InitData } from './interfaces/initParams';
import { PaymentTypes, TransactionType } from './constants';
import { parseInitTransactionData } from './utils/soapInitResultParser';
import { InitTransactionResponse, InitTransaction } from './interfaces/initTransactionParser';

export class MegaPos {
  private readonly config: Config;

  constructor(configInput: Config) {
    this.config = {
      ...configInput,
      bankartGatewayId: configInput.bankartGatewayId || '',
      nlbKlikGatewayId: configInput.nlbKlikGatewayId || '',
      currency: configInput.currency || 'EUR',
    };
  }

  public getSoapConfig = (): SoapConfig => {
    return this.setUpSoapData();
  };

  public getInitData = (
    orderData: OrderData,
    paymentType: PaymentTypes,
    transactionType: TransactionType,
  ): InitBodyData => {
    return this.setInitData(orderData, paymentType, transactionType);
  };

  public parseInitResultData = (initResultData: InitTransactionResponse): InitTransaction => {
    return parseInitTransactionData(initResultData);
  };

  private setInitData = (
    orderData: OrderData,
    paymentType: PaymentTypes,
    transactionType: TransactionType,
  ): InitBodyData => {
    const idData = {
      'store-id': this.config.megaPosStoreId,
      'transaction-id': uuidv4(),
    };
    const amountData: AmountData = {
      amount: orderData.totalPrice,
      currency: this.config.currency,
    };
    const transactionData: TransactionData = {
      'status-url': this.config.statusUrl,
      'update-url': this.config.updateUrl,
      'transaction-type': transactionType,
    };
    const customer: Customer = {
      'customer-name': orderData.firstName,
      'customer-surname': orderData.lastName,
      email: orderData.email,
    };
    if (paymentType === PaymentTypes.CARD) {
      transactionData['gateway-id'] = this.config.bankartGatewayId;
      customer['customer-address'] = orderData.address;
      customer['customer-city'] = orderData.city;
      customer['customer-post'] = orderData.postNumber;
      customer['customer-country'] = 'SI';
    } else if (paymentType === PaymentTypes.NLB_KLIK) {
      transactionData['gateway-id'] = this.config.nlbKlikGatewayId;
    }
    return {
      'init-data': { ...idData, ...amountData, ...transactionData, ...customer } as InitData,
    } as InitBodyData;
  };

  private setUpSoapData = (): SoapConfig => {
    const staticPath = path.resolve(this.config.staticBasePath);
    return {
      wsdlFilePath: path.join(staticPath, this.config.wsdlFileName),
      megaPosCertPath: path.join(staticPath, this.config.megaPosCertFileName),
      megaPosKeyPath: path.join(staticPath, this.config.megaPosKeyFileName),
    };
  };
}
