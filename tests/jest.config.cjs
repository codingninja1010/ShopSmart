/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
    html: '<!DOCTYPE html><html><head></head><body></body></html>',
  },
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/**/?(*.)+(test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx'],
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react'] }],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/../src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|webp|bmp|ico)$': '<rootDir>/mocks/fileMock.js',
  },
  verbose: false,
  collectCoverageFrom: [
    '../src/**/*.{js,jsx}',
    '!../src/**/index.js',
  ],
};
