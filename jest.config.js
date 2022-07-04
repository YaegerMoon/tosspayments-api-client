/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.spec.(js|jsx|ts|tsx)'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
