import type { Config } from 'jest';
import baseConfig from './jest.config-base';

const pipelineConfig: Config = {
  ...baseConfig,
  collectCoverage: true,
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/../coverage',
        suiteName: 'Unit Tests',
      },
    ],
  ],
};
export default pipelineConfig;
