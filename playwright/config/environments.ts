// Environment configuration for different deployment stages
// Centralized environment settings with validation

export interface EnvironmentConfig {
  name: string;
  baseURL: string;
  apiURL: string;
  timeout: {
    action: number;
    navigation: number;
    test: number;
    expect: number;
  };
  retries: {
    ci: number;
    local: number;
  };
  reporter: {
    html: { outputFolder: string; open?: string };
    junit: { outputFile: string };
  };
  use: {
    trace: 'on-first-retry' | 'retain-on-failure' | 'on' | 'off';
    screenshot: 'only-on-failure' | 'on' | 'off';
    video: 'retain-on-failure' | 'on' | 'off';
  };
  metadata: {
    environment: 'development' | 'staging' | 'production';
    isCI: boolean;
  };
}

export const environments: Record<string, EnvironmentConfig> = {
  // Local development environment
  local: {
    name: 'local',
    baseURL: 'http://localhost:3000',
    apiURL: 'http://localhost:3001/api',
    timeout: {
      action: 15000,
      navigation: 30000,
      test: 60000,
      expect: 10000,
    },
    retries: {
      ci: 0,
      local: 0,
    },
    reporter: {
      html: { outputFolder: 'playwright-report', open: process.env.CI ? 'never' : 'always' },
      junit: { outputFile: 'test-results/local-results.xml' },
    },
    use: {
      trace: 'retain-on-failure',
      screenshot: 'only-on-failure',
      video: 'off', // No video locally for speed
    },
    metadata: {
      environment: 'development',
      isCI: false,
    },
  },

  // Staging environment for pre-production testing
  staging: {
    name: 'staging',
    baseURL: 'https://staging.gmao.app',
    apiURL: 'https://api-staging.gmao.app',
    timeout: {
      action: 20000, // Slightly longer for staging
      navigation: 45000,
      test: 90000,
      expect: 15000,
    },
    retries: {
      ci: 2,
      local: 1,
    },
    reporter: {
      html: { outputFolder: 'playwright-report/staging', open: 'never' },
      junit: { outputFile: 'test-results/staging-results.xml' },
    },
    use: {
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },
    metadata: {
      environment: 'staging',
      isCI: true,
    },
  },

  // Production environment for smoke tests
  production: {
    name: 'production',
    baseURL: 'https://gmao.app',
    apiURL: 'https://api.gmao.app',
    timeout: {
      action: 25000, // Longer timeouts for production
      navigation: 60000,
      test: 120000,
      expect: 20000,
    },
    retries: {
      ci: 1,
      local: 0,
    },
    reporter: {
      html: { outputFolder: 'playwright-report/production', open: 'never' },
      junit: { outputFile: 'test-results/production-results.xml' },
    },
    use: {
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },
    metadata: {
      environment: 'production',
      isCI: true,
    },
  },
};

// Environment-specific configurations for different test types
export const testProfiles = {
  // Fast smoke tests for CI
  smoke: {
    testMatch: '**/*.smoke.spec.ts',
    timeout: 30000,
    retries: 0,
    use: {
      trace: 'off',
      screenshot: 'only-on-failure',
      video: 'off',
    },
  },

  // Full regression tests
  regression: {
    testMatch: '**/*.regression.spec.ts',
    timeout: 120000,
    retries: 2,
    use: {
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
    },
  },

  // Accessibility tests
  accessibility: {
    testMatch: '**/*.a11y.spec.ts',
    timeout: 60000,
    retries: 1,
    use: {
      trace: 'on',
      screenshot: 'on',
      video: 'on',
    },
  },

  // Performance tests
  performance: {
    testMatch: '**/*.perf.spec.ts',
    timeout: 180000,
    retries: 0,
    use: {
      trace: 'on',
      screenshot: 'on',
      video: 'on',
    },
  },
};

// Helper to get environment config
export const getEnvironmentConfig = (env: string = process.env.TEST_ENV || 'local'): EnvironmentConfig => {
  const config = environments[env];

  if (!config) {
    console.error(`❌ No configuration found for environment: ${env}`);
    console.error(`   Available environments: ${Object.keys(environments).join(', ')}`);
    console.error(`   Falling back to local configuration`);
    return environments.local;
  }

  console.log(`✅ Using environment configuration: ${env.toUpperCase()}`);
  return config;
};

// Helper to merge environment config with test profile
export const getMergedConfig = (env: string, profile?: keyof typeof testProfiles): Partial<EnvironmentConfig> => {
  const envConfig = getEnvironmentConfig(env);

  if (!profile) {
    return envConfig;
  }

  const profileConfig = testProfiles[profile];

  return {
    ...envConfig,
    ...profileConfig,
    reporter: envConfig.reporter, // Keep environment-specific reporter settings
    metadata: envConfig.metadata, // Keep environment metadata
  };
};

export default environments;