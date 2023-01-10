import type { Config } from '@jest/types';
import baseConfig from './jest.config-base';

const pipelineConfig: Config.InitialOptions = {
  ...baseConfig,
  collectCoverage: true,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../coverage',
        suiteName: 'Unit Tests'
      }
    ]
  ]
};
// eslint-disable-next-line import/no-default-export
export default pipelineConfig;
