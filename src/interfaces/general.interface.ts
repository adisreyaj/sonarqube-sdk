export interface SonarQubeSDKConfig extends Partial<SonarQubeSDKAuthConfig> {
  url: string;
  projectKey: string;
}

export interface SonarQubeSDKAuthConfig {
  auth: SonarQubeSDKAuth;
}

export interface SonarQubeSDKAuth {
  username: string;
  password: string;
}
