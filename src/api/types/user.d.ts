import { UserRole } from "@/interfaces/user";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: UserRole;
}

export type GetUsersParams = {
  offset?: number | null;
  limit?: number | null;
}