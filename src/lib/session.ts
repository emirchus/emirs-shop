import { User } from '@/interfaces/user';
import { SessionOptions } from 'iron-session';

export interface SessionData {
  user?: User;
  access_token?: string;
}

export const defaultSession: SessionData = {};

export const sessionOptions: SessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'iron-examples-app-router-client-component-route-handler-swr'
};
