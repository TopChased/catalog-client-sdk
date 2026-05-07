// Test setup file for Jest
// This file is loaded before each test suite

// Global test timeout
// Note: jest is available globally in test environment
// @ts-ignore - jest is available globally
globalThis.jest?.setTimeout?.(10000);

// Mock console methods to keep test output clean
// Uncomment to suppress console output during tests
/* @ts-ignore 
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};
*/

// Add any global test utilities or mocks here
