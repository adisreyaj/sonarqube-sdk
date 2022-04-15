export interface SonarQubeSDKConfig extends Partial<SonarQubeSDKAuthConfig> {
  url: string;
}

export interface SonarQubeSDKAuthConfig {
  type: 'password' | 'token';
  auth: SonarQubeSDKAuth;
}

export type SonarQubeSDKAuth = SonarQubeSDKPasswordAuth | SonarQubeSDKTokenAuth;

export interface SonarQubeSDKPasswordAuth {
  type: 'password';
  username: string;
  password: string;
}

export interface SonarQubeSDKTokenAuth {
  type: 'token';
  token: string;
}
