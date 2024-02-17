import { User } from '@/interfaces/user';
import { SessionOptions } from 'iron-session';
import { BASE_URL } from '.';

export interface SessionData {
  user?: User;
  access_token?: string;
}

export const defaultSession: SessionData = {};

const hostName = new URL(BASE_URL).hostname;

console.log(hostName)

export const sessionOptions: SessionOptions = {
  password: 'complex_password_at_least_32_characters_long',
  cookieName: 'user-session',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    domain: hostName == 'localhost' ? `.${hostName}` : '.' + hostName // add a . in front so that subdomains are included
  }
};
