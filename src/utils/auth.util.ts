import { SonarQubeSDKAuth } from '../interfaces';

export class AuthUtils {
  static setAuthInHeadersIfConfigured = (auth?: SonarQubeSDKAuth) => {
    const options: Record<string, string> = {};
    if (auth) {
      options['Authorization'] =
        'Basic ' + this.getBaseEncodedAuthCredentials(auth);
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
