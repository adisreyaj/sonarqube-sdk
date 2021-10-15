import { ConfigBase } from './base/index.js';
import { MeasuresController } from './controllers/index.js';
import { SonarQubeSDKConfig } from './interfaces/index.js';
import { ValidatorUtils } from './utils/index.js';

export class Client extends ConfigBase {
  constructor(config: SonarQubeSDKConfig) {
    super(config);
    ValidatorUtils.validateConfig(config);
  }

  public measures = new MeasuresController(this.config);
}
