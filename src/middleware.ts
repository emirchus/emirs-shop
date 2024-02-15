import { NextRequest, NextResponse } from 'next/server';
import { getSubdomain } from './lib';

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get('host')!;

  const subdomain = getSubdomain(hostname);

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  // rewrites for store page
  if (subdomain === '' || subdomain === 'www') {
    // const session = await getToken({ req });
    // if (!session && path !== '/login') {
    //   return NextResponse.redirect(new URL('/login', req.url));
    // } else if (session && path == '/login') {
    //   return NextResponse.redirect(new URL('/', req.url));
    // }
    return NextResponse.rewrite(new URL(`/store${path === '/' ? '' : path}`, req.url));
  }

  // rewrites for admin page
  if (subdomain === 'dashboard') {
    // const session = await getToken({ req });
    // if (!session && path !== '/login') {
    //   return NextResponse.redirect(new URL('/login', req.url));
    // } else if (session && path == '/login') {
    //   return NextResponse.redirect(new URL('/', req.url));
    // }
    console.log(path, req.url);
    // console.log(`/dashboard${path === '/' ? '' : path}`, req.url);
    return NextResponse.rewrite(new URL(`/dashboard${path === '/' ? '' : path}`, req.url));
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public
     */
    '/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)'
  ]
};
