import { authStorageInit, setAuthProvider, configureAuthSession, authGlobalInit } from '@seontechnologies/playwright-utils/auth-session';
import customAuthProvider from '../tests/auth/custom-auth-provider'; // Adjust path as needed

async function globalSetup() {
  // Ensure storage directories exist
  authStorageInit();

  // Configure storage path for auth sessions
  configureAuthSession({
    authStoragePath: process.cwd() + '/playwright/auth-sessions',
    debug: true,
  });

  // Set custom provider (HOW to authenticate)
  setAuthProvider(customAuthProvider);

  // Optional: pre-fetch token for default user, if needed
  // This will store a session for 'default-user' that can be reused
  // await authGlobalInit(); // Enable if you want a default session pre-generated
}

export default globalSetup;
