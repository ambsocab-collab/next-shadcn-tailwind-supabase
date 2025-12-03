import { faker } from '@faker-js/faker';
import type { APIRequest } from '@seontechnologies/playwright-utils/api-request';

export class UserFactory {
  private createdUsers: string[] = [];

  constructor(private apiRequest: APIRequest) {}

  async createUser(overrides = {}) {
    const user = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password({ length: 12 }),
      ...overrides,
    };

    try {
      const { status, body } = await this.apiRequest({
        method: 'POST',
        path: '/users',
        body: user,
      });

      if (status !== 201 && status !== 200) {
        throw new Error(`Failed to create user: ${JSON.stringify(body)}`);
      }

      const created = body;
      this.createdUsers.push(created.id);
      return created;
    } catch (error) {
      console.error('UserFactory.createUser error:', error);
      throw error;
    }
  }

  async createAdmin(overrides = {}) {
    return this.createUser({
      role: 'admin',
      email: faker.internet.email({
        firstName: 'admin',
        lastName: faker.person.lastName().toLowerCase(),
        provider: 'test.gmao'
      }),
      ...overrides,
    });
  }

  async createTestUser(overrides = {}) {
    return this.createUser({
      email: 'test-user-' + faker.string.alphanumeric(8) + '@test.gmao',
      name: 'Test User',
      ...overrides,
    });
  }

  async cleanup() {
    // Delete all created users with proper error handling
    for (const userId of this.createdUsers) {
      try {
        await this.apiRequest({
          method: 'DELETE',
          path: `/users/${userId}`,
        });
      } catch (error) {
        console.warn(`Failed to cleanup user ${userId}:`, error);
      }
    }
    this.createdUsers = [];
  }

  async findUser(email: string) {
    const { body } = await this.apiRequest({
      method: 'GET',
      path: `/users?email=${encodeURIComponent(email)}`,
    });

    return body;
  }
}
