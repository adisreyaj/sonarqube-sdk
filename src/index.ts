import produce from 'immer';
import fetch from 'node-fetch';
import { SONAR_API } from './constants/config.constant.js';
import { SonarQubeSDKConfig } from './interfaces/general.interface';
import { has } from './utils/utils.js';

export class Client {
  #config: SonarQubeSDKConfig;
  private get auth() {
    if (has(this.#config, 'auth') && this.#config.auth) {
      const { password, username } = this.#config.auth;
      if (username != null || password != null) {
        return this.#config.auth;
      }
    }
    return null;
  }

  private get url() {
    return this.#config.url;
  }

  private get projectKey() {
    return this.#config.projectKey;
  }
  constructor(config: SonarQubeSDKConfig) {
    this.validateConfig(config);
    this.#config = config;
  }

  measures = {
    component: async (metricKeys: string[]) => {
      let options = {};
      this.setAuthInHeadersIfConfigured(options);
      try {
        const response = await fetch(
          `${this.url}/${SONAR_API.measures.component}?component=${this.projectKey}&metricKeys=${metricKeys.join(',')}`,
          options,
        );
        const body = response.json();
        return body;
      } catch (error: any) {
        throw new Error(error?.message);
      }
    },
  };

  private setAuthInHeadersIfConfigured = (options: any) => {
    if (this.auth) {
      const basicAuthHeader = {
        Authorization:
          'Basic ' + Buffer.from(`${this.auth?.username}:${this.auth?.password}`, 'binary').toString('base64'),
      };
      return produce(options, (draft: any) => {
        Object.assign(draft, basicAuthHeader);
      });
    }
    return options;
  };

  private validateConfig = (config: SonarQubeSDKConfig) => {
    if (config?.url) {
      const isValidURLStart = config.url.startsWith('http://') || config.url.startsWith('https://');
      if (!isValidURLStart) {
        throw new Error('Make sure the url starts with http:// or https://');
      }
      const endsWithSlash = config.url.slice(-1) === '/';
      if (endsWithSlash) {
        throw new Error('Make sure there is no trailing / at the end of URL');
      }
      if (config?.projectKey || config?.projectKey === '') {
        throw new Error('Please provide a valid project key');
      }
      if (has(config, 'auth') && config.auth) {
        const { password, username } = config.auth;
        if (username == null || password == null) {
          throw new Error('Please provide a valid username and password');
        }
      }
    }
  };
}
