export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar: string;
}
export type UserRole = 'customer' | 'admin';
