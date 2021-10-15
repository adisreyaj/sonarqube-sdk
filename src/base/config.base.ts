import fetch, { RequestInit } from 'node-fetch';
import { SonarQubeSDKConfig } from '../interfaces/general.interface.js';
import { AuthUtils } from '../utils/auth.util.js';
import { has } from '../utils/utils.js';

export class ConfigBase {
  protected config!: SonarQubeSDKConfig;

  constructor(config: SonarQubeSDKConfig) {
    this.config = config;
  }

  protected setAuthInHeadersIfConfigured = AuthUtils.setAuthInHeadersIfConfigured;

  protected fetchResponse = async (url: string, init: RequestInit | undefined = undefined) => {
    try {
      const response = await fetch(url, init);
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  protected serializeQueryParams = (query: URLSearchParams) => query.toString();
  protected get auth() {
    if (has(this.config, 'auth') && this.config.auth) {
      const { password, username } = this.config.auth;
      if (username != null || password != null) {
        return this.config.auth;
      }
    }
    return null;
  }

  protected get url() {
    return this.config.url;
  }

  protected get projectKey() {
    return this.config.projectKey;
  }
}
