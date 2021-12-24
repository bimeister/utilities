import type { Config } from '@jest/types';
import baseConfig from './jest.config-base';

const config: Config.InitialOptions = {
  ...baseConfig,
  collectCoverage: false
};
export default config;
