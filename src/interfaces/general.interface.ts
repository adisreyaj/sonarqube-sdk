export interface SonarQubeSDKConfig extends Partial<SonarQubeSDKAuthConfig> {
  url: string;
  projectKey: string;
}

export interface SonarQubeSDKAuthConfig {
  auth: {
    username: string;
    password: string;
  };
}
