import { BASE_URL } from '@/lib';

export class DashboardResource {
  async getData(): Promise<[number, number, number]> {
    const response = await fetch(`${BASE_URL}/api/dashboard`);

    return response.json();
  }
}
