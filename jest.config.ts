/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';

const baseDir = '<rootDir>/src';
const baseTestDir = '<rootDir>/tests/unit';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks: true,
    collectCoverage: true,
    coverageReporters: ['text-summary', 'lcov'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    collectCoverageFrom: [`${baseDir}/**/*.ts`],
    testMatch: [`${baseTestDir}/**/*.test.ts`],
    verbose: true,
};

export default config;
