import { User } from '@/interfaces/user';
import { BASE_URL } from '@/lib/config';

export class AuthResource {
  async login(email: string, password: string): Promise<User | { message: string }> {
    const response = await fetch(`${BASE_URL}/api/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    return response.json();
  }

  async logout(): Promise<void> {
    await fetch(`${BASE_URL}/api/session`, {
      method: 'DELETE'
    });
  }

  async profile(): Promise<User | { message: string }> {
    const response = await fetch(`${BASE_URL}/api/session`, {
      method: 'GET'
    });

    return response.json();
  }

  async refreshUser() {
    const response = await fetch(`${BASE_URL}/api/session`, {
      method: 'PUT'
    });

    return response.json();
  }
}
