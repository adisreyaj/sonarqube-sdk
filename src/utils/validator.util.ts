import { SonarQubeSDKConfig } from '../interfaces';
import { isEmpty } from 'lodash-es';

export class ValidatorUtils {
  static validateConfig = (config: SonarQubeSDKConfig) => {
    if (config?.url && config.url !== '') {
      const isValidURLStart =
        config.url.startsWith('http://') || config.url.startsWith('https://');
      if (!isValidURLStart) {
        throw new Error('Make sure the url starts with http:// or https://');
      }
      const endsWithSlash = config.url.slice(-1) === '/';
      if (endsWithSlash) {
        throw new Error('Make sure there is no trailing / at the end of URL');
      }
    } else {
      throw new Error('Please provide a valid sonar url');
    }
    if (!isEmpty(config.auth)) {
      switch (config.auth?.type) {
        case 'token': {
          if (isEmpty(config.auth?.token)) {
            throw new Error('Please provide a valid token');
          }
          break;
        }
        default: {
          if (
            isEmpty(config.auth?.username) ||
            isEmpty(config.auth?.password)
          ) {
            throw new Error('Please provide a valid username and password');
          }
        }
      }
    }
  };
}
