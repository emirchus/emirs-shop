import { SessionData, sessionOptions } from '@/lib/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const useSession = async () => {
  return getIronSession<SessionData>(cookies(), sessionOptions);
};
