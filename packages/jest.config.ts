import type { Config } from 'jest';
import baseConfig from './jest.config-base';

const config: Config = {
  ...baseConfig,
  collectCoverage: false,
};
export default config;
