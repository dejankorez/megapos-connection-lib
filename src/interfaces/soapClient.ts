import * as https from 'https';

export interface SoapConfig {
  wsdlFilePath: string;
  megaPosCertPath: string;
  megaPosKeyPath: string;
}

export interface ClientOptions {
  cert: Buffer;
  key: Buffer;
  rejectUnauthorized: boolean;
  strictSSL: boolean;
  agent: https.Agent;
  disableCache: boolean;
}
