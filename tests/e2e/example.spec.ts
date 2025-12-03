import { test, expect, log } from '../support/fixtures/merged-fixtures';
import { selectors } from '../support/selectors';

test.describe('GMAO MVP - Example Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await log.step('Setup test environment');
  });

  test.describe('Smoke Tests', () => {
    test('should load homepage - smoke', async ({ page }) => {
      await log.step('Navigate to homepage and verify title');

      await page.goto('/');

      // Verify basic page elements
      await expect(page).toHaveTitle(/GMAO|Home/i);

      // Check for main navigation
      await expect(page.locator(selectors.navigation.mainMenu)).toBeVisible();

      await log.success('Homepage loaded successfully');
    });

    test('should handle authentication flow - smoke', async ({ page, testUser, authOptions }) => {
      await log.step('Test authentication with auto-created test user');

      // Login with auto-created test user
      await page.goto('/login');

      await page.fill(selectors.auth.emailInput, testUser.email);
      await page.fill(selectors.auth.passwordInput, testUser.password);
      await page.click(selectors.auth.loginButton);

      // Verify successful login
      await expect(page.locator(selectors.navigation.userMenu)).toBeVisible();

      // Verify we can access protected content
      await page.goto('/dashboard');
      await expect(page.locator(selectors.dashboard.dashboardContainer)).toBeVisible();

      await log.success('Authentication flow completed');
    });
  });

  test.describe('API Integration Tests', () => {
    test('should create and manage users via API', async ({ apiRequest, userFactory, testData }) => {
      await log.step('Create user via API and verify operations');

      // Create a new user via API
      const userData = testData.user();
      const createdUser = await userFactory.createUser(userData);

      expect(createdUser).toMatchObject({
        email: userData.email,
        name: userData.name,
      });
      expect(createdUser.id).toBeDefined();

      // Verify user can be retrieved
      const foundUser = await userFactory.findUser(createdUser.email);
      expect(foundUser.id).toBe(createdUser.id);

      await log.success('User management API working correctly');
    });

    test('should handle API errors gracefully', async ({ apiRequest, log }) => {
      await log.step('Test API error handling');

      // Try to get non-existent user
      const { status, body } = await apiRequest({
        method: 'GET',
        path: '/users/non-existent-id',
      });

      expect(status).toBe(404);
      expect(body).toMatchObject({
        error: expect.stringContaining('not found'),
      });

      await log.success('API error handling working correctly');
    });
  });

  test.describe('Advanced Playwright Utils Features', () => {
    test('should use network monitoring', async ({ page, networkErrorMonitor, log }) => {
      await log.step('Test network error monitoring');

      // Enable network monitoring
      await networkErrorMonitor.start(page);

      // Navigate to page that might have network issues
      await page.goto('/dashboard');

      // Check for network errors
      const errors = await networkErrorMonitor.getErrors();

      if (errors.length > 0) {
        await log.warning(`Network errors detected: ${JSON.stringify(errors, null, 2)}`);
      } else {
        await log.success('No network errors detected');
      }

      // Should have no critical errors on dashboard
      const criticalErrors = errors.filter(e => e.status >= 500);
      expect(criticalErrors).toHaveLength(0);
    });

    test('should use recurse for async operations', async ({ apiRequest, recurse, testData }) => {
      await log.step('Test recursive polling for async operations');

      // Create a background process
      const processId = await apiRequest({
        method: 'POST',
        path: '/processes',
        body: { type: 'data-export' },
      });

      // Poll until process completes
      const result = await recurse(
        () => apiRequest({ method: 'GET', path: `/processes/${processId.body.id}` }),
        (response) => response.body.status === 'completed',
        {
          timeout: 30000, // 30 seconds max
          interval: 1000, // Check every second
        }
      );

      expect(result.body.status).toBe('completed');
      expect(result.body.result).toBeDefined();

      await log.success(`Async process completed: ${processId.body.id}`);
    });

    test('should use network recorder for offline testing', async ({ page, networkRecorder, context }) => {
      await log.step('Test network recording capabilities');

      // Start network recording
      await networkRecorder.setup(context);
      await networkRecorder.record();

      // Perform actions that will be recorded
      await page.goto('/dashboard');
      await page.click(selectors.navigation.userMenu);

      // Stop recording
      const harPath = await networkRecorder.stop('dashboard-interaction');

      expect(harPath).toBeDefined();
      await log.success(`Network interactions recorded to: ${harPath}`);

      // In real tests, you could use the HAR for offline testing
      // await networkRecorder.playback(harPath, context);
    });
  });

  test.describe('Accessibility Tests', () => {
    test('should be accessible - a11y', async ({ page }) => {
      await log.step('Run accessibility checks');

      await page.goto('/');

      // Basic accessibility checks
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('[role="navigation"]')).toBeVisible();

      // Check for proper ARIA labels
      const navigation = page.locator('[role="navigation"]');
      await expect(navigation).toHaveAttribute('aria-label');

      await log.success('Basic accessibility checks passed');
    });
  });

  test.describe('Performance Tests', () => {
    test('should load within performance limits - perf', async ({ page }) => {
      await log.step('Test page load performance');

      const startTime = Date.now();

      await page.goto('/');

      const loadTime = Date.now() - startTime;

      // Page should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);

      await log.success(`Page loaded in ${loadTime}ms`);
    });
  });
});
