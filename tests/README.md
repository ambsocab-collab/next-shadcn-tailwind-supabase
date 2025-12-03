# GMAO MVP - Test Framework Documentation

## 🎯 Overview

Production-ready Playwright test framework with advanced utilities, comprehensive fixtures, and CI/CD integration. Built for reliability, maintainability, and scalability.

## 📁 Directory Structure

```
tests/
├── e2e/                          # End-to-end test files
│   └── example.spec.ts           # Example test with all patterns
├── support/                      # Framework infrastructure
│   ├── fixtures/                 # Test fixtures and factories
│   │   ├── merged-fixtures.ts    # 🌟 Central test object (import this!)
│   │   ├── custom-fixtures.ts    # Project-specific fixtures
│   │   └── factories/            # Data factories
│   │       └── user-factory.ts   # User management factory
│   ├── selectors.ts              # 📍 Centralized selectors
│   └── helpers/                  # Utility functions (add as needed)
├── OPTIMIZATION_PLAN.md          # 📊 Framework analysis and roadmap
└── README.md                     # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install project dependencies
pnpm install

# Install Playwright browsers
pnpm playwright install

# Configure environment
cp .env.example .env
```

### 2. Import Test Fixtures

```typescript
import { test, expect } from '../support/fixtures/merged-fixtures';
import { selectors } from '../support/selectors';

test('my test', async ({ page, apiRequest, testUser }) => {
  // All fixtures available automatically
});
```

### 3. Run Tests

```bash
# Local development
pnpm test:e2e

# Specific environments
TEST_ENV=staging pnpm test:e2e
TEST_ENV=production pnpm test:e2e

# Test types
pnpm test:e2e --grep "smoke"
pnpm test:e2e --grep "regression"
pnpm test:e2e --grep "accessibility"

# Debug modes
pnpm test:e2e --ui              # Interactive UI mode
pnpm test:e2e --headed          # Browser visible
PWDEBUG=1 pnpm test:e2e          # Playwright Inspector
```

## 🧩 Available Fixtures

### Core Playwright Fixtures
- `page` - Playwright page instance
- `context` - Browser context
- `request` - HTTP request context

### Playwright Utils Fixtures 🌟
- `apiRequest` - Typed HTTP client with schema validation
- `authToken` - Authentication token persistence
- `networkErrorMonitor` - Automatic HTTP 4xx/5xx detection
- `networkRecorder` - HAR record/playback for offline testing
- `burnIn` - Smart test selection with git diff
- `recurse` - Cypress-style polling for async conditions

### Custom Project Fixtures
- `userFactory` - Enhanced user creation with API integration
- `testUser` - Auto-created test user for convenience
- `adminUser` - Auto-created admin user
- `testData` - Helper for generating test data

## 📝 Test Patterns

### 1. Basic Test Structure

```typescript
import { test, expect, log } from '../support/fixtures/merged-fixtures';
import { selectors } from '../support/selectors';

test.describe('Feature Name', () => {
  test('should do something - smoke', async ({ page, testUser }) => {
    await log.step('Test description');

    // Arrange
    await page.goto('/login');

    // Act
    await page.fill(selectors.auth.emailInput, testUser.email);
    await page.fill(selectors.auth.passwordInput, testUser.password);
    await page.click(selectors.auth.loginButton);

    // Assert
    await expect(page.locator(selectors.navigation.userMenu)).toBeVisible();

    await log.success('Test completed');
  });
});
```

### 2. API Testing

```typescript
test('should test API endpoint', async ({ apiRequest, userFactory }) => {
  // Create data via factory
  const userData = testData.user();
  const user = await userFactory.createUser(userData);

  // Test API
  const { status, body } = await apiRequest({
    method: 'GET',
    path: `/users/${user.id}`,
  });

  expect(status).toBe(200);
  expect(body.email).toBe(user.email);
});
```

### 3. Network Monitoring

```typescript
test('should monitor network errors', async ({ page, networkErrorMonitor }) => {
  await networkErrorMonitor.start(page);

  await page.goto('/dashboard');

  const errors = await networkErrorMonitor.getErrors();
  const criticalErrors = errors.filter(e => e.status >= 500);

  expect(criticalErrors).toHaveLength(0);
});
```

### 4. Async Operations with Polling

```typescript
test('should handle async operations', async ({ apiRequest, recurse }) => {
  const process = await apiRequest({
    method: 'POST',
    path: '/processes',
    body: { type: 'export' },
  });

  const result = await recurse(
    () => apiRequest({ method: 'GET', path: `/processes/${process.body.id}` }),
    (response) => response.body.status === 'completed',
    { timeout: 30000, interval: 1000 }
  );

  expect(result.body.status).toBe('completed');
});
```

## 🏷️ Test Classification

Use tags in test titles for categorization:

- `smoke` - Critical path tests (run on every commit)
- `regression` - Full feature tests (run on PR merge)
- `accessibility` - A11y compliance tests
- `perf` - Performance tests
- `api` - API-only tests

```typescript
test('should handle critical user flow - smoke', async ({ page }) => {
  // Critical path test
});

test('should validate business rules - regression', async ({ apiRequest }) => {
  // Regression test
});

test('should be accessible - a11y', async ({ page }) => {
  // Accessibility test
});

test('should load within limits - perf', async ({ page }) => {
  // Performance test
});
```

## 🔧 Configuration

### Environment Variables

```bash
# Test environment
TEST_ENV=local|staging|production

# URLs
BASE_URL=http://localhost:3000
API_URL=http://localhost:3001/api

# Authentication (if needed)
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=your-test-password

# Feature flags
FEATURE_FLAG_NEW_UI=true
```

### Environment Configurations

- **Local**: Fast execution, minimal artifacts
- **Staging**: Full artifacts, 2 retries, comprehensive testing
- **Production**: Smoke tests only, conservative timeouts

## 🎭 Playwright Utils Features

### API Request
```typescript
const { status, body, headers } = await apiRequest({
  method: 'POST',
  path: '/users',
  body: userData,
  headers: { 'X-Custom': 'value' },
});
```

### Auth Session
```typescript
// Automatic token management
const response = await apiRequest({
  method: 'GET',
  path: '/protected',
  headers: { Authorization: `Bearer ${authToken}` },
});
```

### Network Recording
```typescript
await networkRecorder.setup(context);
await networkRecorder.record();
// ... perform actions
const harPath = await networkRecorder.stop('test-name');
```

### Burn-in Testing
```typescript
// Smart test selection based on git changes
// Automatically runs affected tests in CI
```

## 🧪 Test Data Management

### User Factory
```typescript
// Create basic user
const user = await userFactory.createUser();

// Create admin user
const admin = await userFactory.createAdmin();

// Create with overrides
const customUser = await userFactory.createUser({
  role: 'manager',
  department: 'IT',
});

// Use auto-created fixtures
test('with auto user', async ({ testUser, adminUser }) => {
  // testUser and adminUser are automatically created
});
```

### Test Data Helper
```typescript
const userData = testData.user();
const orgData = testData.organization();
const projectData = testData.project();
const randomString = testData.randomString(12);
```

## 📍 Selector Strategy

Use centralized selectors for maintainability:

```typescript
import { selectors } from '../support/selectors';

// Authentication
selectors.auth.emailInput        // '[data-testid="email-input"]'
selectors.auth.loginButton       // '[data-testid="login-button"]'

// Navigation
selectors.navigation.userMenu    // '[data-testid="user-menu"]'
selectors.navigation.sidebar     // '[data-testid="sidebar"]'

// Dynamic selectors
createDynamicSelector('user', '123')  // '[data-testid="user-123"]'
```

## 🔍 Debugging

### Logging
```typescript
import { log } from '../support/fixtures/merged-fixtures';

await log.step('Starting user creation');
await log.info('User data prepared');
await log.warning('Optional warning message');
await log.success('Operation completed');
await log.error('Error occurred');
```

### Trace Viewer
```bash
# Run tests with trace
pnpm test:e2e --trace on

# View traces
pnpm exec playwright show-trace trace.zip
```

### HTML Report
```bash
# Generate HTML report
pnpm test:e2e

# View report
pnpm exec playwright show-report
```

## 🚀 CI/CD Integration

### GitHub Actions Features
- **Automatic**: Triggers on push/PR to main branches
- **Manual**: Dispatch with environment and test type selection
- **Scheduled**: Daily smoke tests on production
- **Sharding**: Parallel execution for faster feedback
- **Artifacts**: Test results and HTML reports
- **Notifications**: Slack integration for success/failure

### Local CI Simulation
```bash
# Run like CI
CI=true pnpm test:e2e

# With specific environment
CI=true TEST_ENV=staging pnpm test:e2e --grep "smoke"
```

## 📊 Test Reports

### JUnit XML
```bash
# Generated at test-results/junit.xml
# Compatible with CI systems and test management tools
```

### HTML Report
```bash
# Generated at playwright-report/html/
# Interactive report with:
# - Test results and timelines
# - Screenshots and videos on failure
# - Network traces
# - Error details and stack traces
```

## 🎯 Best Practices

### 1. Test Organization
- Group related tests in describe blocks
- Use descriptive test names with tags
- Follow Arrange-Act-Assert pattern

### 2. Selector Strategy
- Always use `data-testid` attributes
- Import from centralized selectors
- Avoid brittle CSS selectors

### 3. Data Management
- Use factories for test data
- Auto-cleanup in fixtures
- Generate realistic data with Faker

### 4. Error Handling
- Use try-catch for custom operations
- Log meaningful error messages
- Validate API responses

### 5. Performance
- Use appropriate timeouts
- Optimize test data size
- Parallelize independent tests

## 🔧 Troubleshooting

### Common Issues

**Tests flaky on CI**
- Increase timeouts in environment config
- Add proper waits and retries
- Check CI resource limits

**API tests failing**
- Verify TEST_ENV and API_URL
- Check authentication setup
- Validate API endpoints are accessible

**Network monitoring not working**
- Ensure networkErrorMonitor.start() is called
- Check browser context setup
- Verify no conflicting network configurations

## 📈 What's New (v2.0)

### ✨ Added
- **Enhanced UserFactory** with API Request integration
- **Burn-in Testing** for smart CI test selection
- **Network Monitoring** for automatic error detection
- **Network Recording** for offline testing capabilities
- **Environment Configuration** with automatic validation
- **Centralized Selectors** for maintainable UI testing
- **Comprehensive Logging** with multiple severity levels
- **GitHub Actions** with sharding and artifacts
- **Test Classification** (smoke, regression, a11y, perf)

### 🚀 Improved
- **Fixture Architecture** with mergeTests pattern
- **Test Data Management** with auto-cleanup
- **CI/CD Pipeline** with parallel execution
- **Documentation** with examples and best practices

## 🔄 Maintenance

### Regular Tasks
- Update Playwright and dependencies
- Review and optimize test data
- Update selectors for UI changes
- Monitor CI performance

### Monitoring
- Test execution times
- Flaky test rates
- Error patterns
- Resource utilization

---

**Framework Version**: 2.0 (Production-Ready)
**Last Updated**: 2025-12-04
**Author**: Murat - Master Test Architect (TEA)

For questions or improvements, consult the development team or reference the [Playwright Documentation](https://playwright.dev/). 🧪
