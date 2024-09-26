import { Buffer } from 'buffer';

import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const config = {
  source: '',
  destination: '/api/auth/basic',
};

export const middleware = (req: NextRequest): NextResponse => {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;
  if (process.env.NEXT_PUBLIC_DEPLOY_STATUS !== 'preview') {
    return NextResponse.next();
  }

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');
    if (user === process.env.NEXT_PUBLIC_USER && pwd === process.env.NEXT_PUBLIC_PASSWORD) {
      return NextResponse.next();
    }
  }
  url.pathname = '/api/auth/basic';

  return NextResponse.rewrite(url);
};
