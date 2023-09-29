import { SonarQubeSDKAuth } from '../interfaces';
import { RequestInit } from 'node-fetch'

export class AuthUtils {
  static setAuthInHeadersIfConfigured = (auth?: SonarQubeSDKAuth) => {
    const options: RequestInit = {};
    if (auth) {
      const headersInit: HeadersInit = {};
      headersInit.Authorization =
      'Basic ' + this.getBaseEncodedAuthCredentials(auth);
      options.headers = headersInit;
    }
    return options;
  };

  private static getBaseEncodedAuthCredentials = (auth: SonarQubeSDKAuth) => {
    switch (auth.type) {
      case 'token':
        return Buffer.from(`${auth.token}:`, 'binary').toString('base64');
      default:
        return Buffer.from(
          `${auth.username}:${auth.password}`,
          'binary',
        ).toString('base64');
    }
  };
}
