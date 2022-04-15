import { URLSearchParams } from 'url';
import { ConfigBase } from '../base';
import { SONAR_API } from '../constants';
import {
  MeasuresRequest,
  MeasuresResponse,
  SonarQubeSDKConfig,
} from '../interfaces';

export class MeasuresController extends ConfigBase {
  constructor(config: SonarQubeSDKConfig) {
    super(config);
  }

  component = async (
    args: MeasuresRequest.MeasureControllerComponentArgs,
  ): Promise<MeasuresResponse.Component> => {
    const options = this.setAuthInHeadersIfConfigured(this.config?.auth);
    try {
      const queryParams = new URLSearchParams({
        component: args.component,
        metricKeys: args.metricKeys.join(','),
      });
      if (args?.additionalFields && Array.isArray(args.additionalFields)) {
        queryParams.append(
          'additionalFields',
          args?.additionalFields.join(','),
        );
      }
      if (args?.branch) {
        queryParams.append('branch', args?.branch);
      }
      if (args?.pullRequest) {
        queryParams.append('pullRequest', args?.pullRequest);
      }
      const response = await this.fetchResponse(
        `${this.url}/${
          SONAR_API.measures.component
        }?${this.serializeQueryParams(queryParams)}`,
        options,
      );
      return response as MeasuresResponse.Component;
    } catch (error: unknown) {
      throw new Error((error as Error)?.message);
    }
  };
}
