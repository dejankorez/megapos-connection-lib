export interface Config {
  wsdlFileName: string;
  bankartGatewayId: string;
  nlbKlikGatewayId: string;
  staticBasePath: string;
  statusUrl: string;
  updateUrl: string;
  megaPosStoreId: string;
  currency: string;
  megaPosCertFileName: string;
  megaPosKeyFileName: string;
}

export interface RequestConfig {
  wsdlFileName: string;
  megaPosCertPath: string;
  megaPosKeyPath: string;
}
