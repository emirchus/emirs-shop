import { User } from '@/interfaces/user';
import { BASE_URL } from '@/lib/config';
import { CreateUserPayload } from '../types/user';

export class UserResource {
  async getAll(): Promise<User[]> {
    try {
      const response = await fetch(`${BASE_URL}/api/users`);

      return response.json();
    } catch (error) {
      console.error('An error occurred', error);

      return [];
    }
  }

  async getOne(id: number): Promise<User | null> {
    try {
      const response = await fetch(`${BASE_URL}/api/users/${id}`);

      return response.json();
    } catch (error) {
      console.error('An error occurred', error);

      return null;
    }
  }

  async createUser(payload: CreateUserPayload): Promise<User | { message: string }> {
    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      return response.json();
    } catch (error) {
      console.error('An error occurred', error);

      return { message: 'An error occurred' };
    }
  }

  async updateUser(
    id: number,
    payload: Partial<CreateUserPayload>
  ): Promise<User | { message: string }> {
    try {
      const response = await fetch(`${BASE_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      return response.json();
    } catch (error) {
      console.error('An error occurred', error);

      return { message: 'An error occurred' };
    }
  }

  async checkEmail(email: string): Promise<boolean> {
    try {
      const response = await fetch(`${BASE_URL}/api/users/check-email?email=${email}`);

      const data = (await response.json()) as {
        isAvailable?: boolean;
      };

      return !!data.isAvailable;
    } catch (error) {
      console.error('An error occurred', error);

      return false;
    }
  }
}
