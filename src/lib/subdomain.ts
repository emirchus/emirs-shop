export type Subdomain = 'www' | 'admin';

export const APPS: Record<Subdomain, string> = {
  www: '/',
  admin: '/admin'
};

export function getSubdomain(location: string) {
  const locationSegments = location.split('.');

  return locationSegments.slice(0, -1).join('');
}
