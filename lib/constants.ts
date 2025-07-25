import { generateDummyPassword } from './db/utils';

// Environment detection constants
export const isProductionEnvironment = process.env.NODE_ENV === 'production';
export const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';

// Test environment detection based on Playwright environment variables
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT,
);

// Regular expression to identify guest user email patterns
export const guestRegex = /^guest-\d+$/;

// Dummy password for guest users and testing scenarios
export const DUMMY_PASSWORD = generateDummyPassword();
