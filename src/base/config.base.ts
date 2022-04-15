import fetch, { RequestInit } from 'node-fetch';
import { SonarQubeSDKConfig } from '../interfaces';
import { AuthUtils } from '../utils';
import { isEmpty, isNil } from 'lodash-es';

export class ConfigBase {
  protected config!: SonarQubeSDKConfig;
  protected setAuthInHeadersIfConfigured =
    AuthUtils.setAuthInHeadersIfConfigured;

  constructor(config: SonarQubeSDKConfig) {
    this.config = config;
  }

  protected get auth() {
    if (!isEmpty(this.config.auth) && !isNil(this.config.auth)) {
      const { type } = this.config.auth;
      switch (type) {
        case 'token': {
          return this.config.auth?.token ?? null;
        }
        default: {
          if (
            !isEmpty(this.config.auth?.username) &&
            !isEmpty(this.config.auth?.password)
          ) {
            return this.config.auth;
          }
          return null;
        }
      }
    }
    return null;
  }

  protected get url() {
    return this.config.url;
  }

  protected fetchResponse = async (
    url: string,
    init: RequestInit | undefined = undefined,
  ) => {
    const response = await fetch(url, init);
    return await response.json();
  };

  protected serializeQueryParams = (query: URLSearchParams) => query.toString();
}
