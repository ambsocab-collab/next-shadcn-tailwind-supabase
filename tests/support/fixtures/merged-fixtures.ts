import { mergeTests, test as base } from '@playwright/test';
import { test as apiRequestFixture } from '@seontechnologies/playwright-utils/api-request/fixtures';
import { createAuthFixtures } from '@seontechnologies/playwright-utils/auth-session/fixtures';
import { test as networkErrorMonitorFixture } from '@seontechnologies/playwright-utils/network-error-monitor/fixtures';
import { test as networkRecorderFixture } from '@seontechnologies/playwright-utils/network-recorder/fixtures';
// import { test as burnInFixture } from '@seontechnologies/playwright-utils/burn-in/fixtures'; // Not available in v3.10.0
import { test as recurseFixture } from '@seontechnologies/playwright-utils/recurse/fixtures';
import { customTest } from './custom-fixtures';

// Create the auth test object by extending base with fixtures from createAuthFixtures()
const authFixture = base.extend(createAuthFixtures());

// Merge all fixtures into one comprehensive test object
export const test = mergeTests(
  apiRequestFixture,           // HTTP client with schema validation
  authFixture,                // Token persistence, multi-user auth
  networkErrorMonitorFixture, // Automatic HTTP 4xx/5xx detection
  networkRecorderFixture,     // HAR record/playback for offline testing
  // burnInFixture,           // Smart test selection with git diff (not available)
  recurseFixture,            // Cypress-style polling for async conditions
  customTest                 // Project-specific fixtures (users, data, etc.)
);

export { expect } from '@playwright/test';

// Re-export commonly used utilities for convenience
export { log } from '@seontechnologies/playwright-utils/log';
export { recurse } from '@seontechnologies/playwright-utils/recurse';
export type { APIRequest } from '@seontechnologies/playwright-utils/api-request';
