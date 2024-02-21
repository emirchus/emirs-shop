import { User } from '@/interfaces/user';
import { BASE_URL } from '@/lib/config';
import { CreateUserPayload, GetUsersParams } from '../types/user';
import { NextURL } from 'next/dist/server/web/next-url';

export class UserResource {
  async getAll(
    params: GetUsersParams = {
      limit: 10,
      offset: 0
    }
  ): Promise<User[]> {
    try {
      const url = new NextURL(`${BASE_URL}/api/users`);

      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const value = (params as never)[key];
          if (value === null || value === undefined) continue;
          url.searchParams.append(key, value);
        }
      }

      const res = await (
        await fetch(url, {
          next: {
            revalidate: 60
          }
        })
      ).json();

      return res;
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
