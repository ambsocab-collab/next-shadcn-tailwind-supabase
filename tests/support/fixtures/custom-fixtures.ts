import { test as base } from '@playwright/test';
import { UserFactory } from './factories/user-factory';
import { faker } from '@faker-js/faker';

type CustomTestFixtures = {
  userFactory: UserFactory;
  testUser: any; // Auto-created test user
  adminUser: any; // Auto-created admin user
  testData: any; // Helper for test data generation
};

export const customTest = base.extend<CustomTestFixtures>({
  // Enhanced user factory with API request integration
  userFactory: async ({ apiRequest }, use) => {
    const factory = new UserFactory(apiRequest);
    await use(factory);
    await factory.cleanup(); // Auto-cleanup
  },

  // Auto-create test user for convenience
  testUser: async ({ userFactory }, use) => {
    const user = await userFactory.createTestUser();
    await use(user);
  },

  // Auto-create admin user for admin tests
  adminUser: async ({ userFactory }, use) => {
    const admin = await userFactory.createAdmin();
    await use(admin);
  },

  // Test data helper
  testData: async ({}, use) => {
    await use({
      user: () => ({
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password({ length: 12 }),
      }),
      organization: () => ({
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        address: faker.location.streetAddress(),
      }),
      project: () => ({
        name: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        startDate: faker.date.future(),
      }),
      randomString: (length = 8) => faker.string.alphanumeric(length),
      randomNumber: (min = 1, max = 100) => faker.number.int({ min, max }),
    });
  },
});
