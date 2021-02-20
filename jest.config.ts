import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: false,
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json'
    }
  },
  reporters: [['jest-junit', { suiteName: 'Unit Tests', outputDirectory: 'coverage' }]],
  coverageDirectory: 'coverage',
  passWithNoTests: false
};
export default config;
