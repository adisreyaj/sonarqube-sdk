import produce from 'immer';
import { SonarQubeSDKAuth } from '../interfaces/general.interface.js';

export class AuthUtils {
  static setAuthInHeadersIfConfigured = (options: any, auth?: SonarQubeSDKAuth) => {
    if (auth) {
      const basicAuthHeader = {
        Authorization: 'Basic ' + Buffer.from(`${auth?.username}:${auth?.password}`, 'binary').toString('base64'),
      };
      return produce(options, (draft: any) => {
        Object.assign(draft, basicAuthHeader);
      });
    }
    return options;
  };
}
