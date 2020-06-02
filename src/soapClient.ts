import { createClient } from 'soap';
import * as https from 'https';
import * as fs from 'fs';

import { SoapConfig, ClientOptions } from './interfaces/soapClient';

export class SoapClient {
  private readonly soapConfig: SoapConfig;

  constructor(config: SoapConfig) {
    this.soapConfig = {
      ...config,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getSoapClient = (): Promise<any> => {
    return this.setUpSoapClient();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sendViaSoapClient = (client: any, bodyData: any): Promise<any> =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      client(bodyData, (err: any, result: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setUpSoapClient = (): Promise<any> =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createClient(this.soapConfig.wsdlFilePath, (err: any, client: any) => {
        if (err) {
          return reject(err);
        }
        client.setSecurity({
          addOptions: (options: ClientOptions) => {
            options.cert = fs.readFileSync(this.soapConfig.megaPosCertPath);
            options.key = fs.readFileSync(this.soapConfig.megaPosKeyPath);
            options.rejectUnauthorized = false;
            options.strictSSL = false;
            options.agent = new https.Agent(options);
            options.disableCache = true;
          },
          toXML: () => {
            return '';
          },
        });
        return resolve(client.Megapos3.Megapos3ServicePort);
      });
    });
}
