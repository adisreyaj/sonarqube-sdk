import { SonarQubeSDKConfig } from '../interfaces/general.interface.js';
import { has } from './utils.js';

export class ValidatorUtils {
  static validateConfig = (config: SonarQubeSDKConfig) => {
    if (config?.url && config.url !== '') {
      const isValidURLStart = config.url.startsWith('http://') || config.url.startsWith('https://');
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
    if (!config?.projectKey || config?.projectKey === '') {
      throw new Error('Please provide a valid project key');
    }
    if (has(config, 'auth') && config.auth) {
      const { password, username } = config.auth;
      if (username == null || password == null) {
        throw new Error('Please provide a valid username and password');
      }
    }
  };
}
