import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Make jest aware of src alias "@"
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx'
        },
        isolatedModules: true
      }
    ]
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/'
  ],
  // Suppress the punycode deprecation warning
  silent: true,
  // Improve performance with appropriate worker count
  maxWorkers: '75%',
  // Cache babel transformations
  cache: true,
  // Run tests in parallel
  maxConcurrency: 5
};

export default config; 