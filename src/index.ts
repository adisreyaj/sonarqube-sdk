import { ConfigBase } from './base';
import { MeasuresController } from './controllers';
import { SonarQubeSDKConfig } from './interfaces';
import { ValidatorUtils } from './utils';

export class Client extends ConfigBase {
  public readonly measures = new MeasuresController(this.config);

  constructor(config: SonarQubeSDKConfig) {
    super(config);
    ValidatorUtils.validateConfig(config);
  }
}

export * from './interfaces';
