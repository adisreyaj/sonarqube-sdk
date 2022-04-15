/* eslint-disable @typescript-eslint/no-namespace */
export namespace MeasuresResponse {
  export interface Component
    extends ComponentBase,
      ComponentMetrics,
      ComponentPeriods {}

  export interface ComponentBase {
    component: ComponentBaseComponent;
  }

  export interface ComponentBaseComponent {
    key: string;
    name: string;
    qualifier: string;
    language: string;
    path: string;
    measures: ComponentBaseMeasures[];
  }

  export interface ComponentBaseMeasures {
    metric: string;
    value?: string;
    periods?: ComponentBasePeriods[];
  }

  export interface ComponentBasePeriods {
    index: number;
    value: string;
    bestValue: boolean;
  }

  export interface ComponentMetrics {
    /**
     * Additional Metrics Field Response
     */
    metrics?: ComponentMetric[];
  }

  export interface ComponentMetric {
    key: string;
    name: string;
    description: string;
    domain: string;
    type: string;
    higherValuesAreBetter: boolean;
    qualitative: boolean;
    hidden: boolean;
    custom: boolean;
  }

  export interface ComponentPeriods {
    /**
     * Additional Periods Field Response
     */
    periods?: ComponentPeriod[];
  }

  export interface ComponentPeriod {
    index: number;
    mode: string;
    date: string;
    parameter: string;
  }
}

export namespace MeasuresRequest {
  interface MeasureControllerArgsBase {
    /**
     * Comma-separated list of metric keys
     */
    metricKeys: string[];
    /**
     * Component key
     */
    component: string;
  }

  export interface MeasureControllerComponentArgs
    extends MeasureControllerArgsBase {
    /**
     * Comma-separated list of additional fields that can be returned in the response.
     */
    additionalFields?: MeasuresRequestAdditionalField[];
    /**
     * Branch key
     */
    branch?: string;
    /**
     * Pull request id
     */
    pullRequest?: string;
  }

  export enum MeasuresRequestAdditionalField {
    periods = 'periods',
    metrics = 'metrics',
  }
}
