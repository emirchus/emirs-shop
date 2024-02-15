export const APPS : {
  subdomain: string;
  path: string;
}[]
 = [
  {
    subdomain: 'www',
    path: '/store/'
  },
  {
    subdomain: 'admin',
    path: '/admin/'
  }
];

export function getSubdomain(location: string) {
  const locationSegments = location.split('.');

  let sliceTill = -2;

  // Path localhost
  const isLocalhost = locationSegments.slice(-1)[0] === 'localhost';

  if (isLocalhost) sliceTill = -1;

  return locationSegments.slice(0, sliceTill).join('');
}
