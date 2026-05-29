// middleware.ts at project root
//
// Materialized from teaching/deploy-your-own.md template per Phase 8.5 + deploy.
// Cross-reference: teaching/security.md §1 (5 P0 red lines).

import { next } from '@vercel/edge';

export const config = {
  // 紅線 #4 fix: 明確包 /data/* /api/* 防止 JSON 被 bypass
  matcher: ['/((?!_static|favicon|robots\\.txt).*)']
};

const SECURITY_HEADERS = {
  // 紅線 #5 cross-cut: 收緊 render-time exfil 通道
  'Content-Security-Policy':
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

export default function middleware(request: Request) {
  const password = process.env.SITE_PASSWORD;

  // 紅線 #2 fix: env var 漏設 → fail closed，唔係 fail open
  if (!password) {
    return new Response('Server misconfigured: SITE_PASSWORD not set', { status: 500 });
  }

  // 紅線 #4 fix: production + preview 都 enforce; 其他 env 直接拒
  const env = process.env.VERCEL_ENV;
  if (env !== 'production' && env !== 'preview') {
    return new Response('Forbidden', { status: 403 });
  }

  const auth = request.headers.get('authorization');

  if (auth) {
    const encoded = auth.split(' ')[1] ?? '';
    let decoded = '';
    try { decoded = atob(encoded); } catch { /* invalid base64 */ }
    const [, supplied] = decoded.split(':');
    if (supplied && supplied === password) {
      // 紅線 #5 fix: pass-through path 都套 SECURITY_HEADERS
      return next({
        headers: SECURITY_HEADERS,
      });
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Personal OS"',
      'Content-Type': 'text/plain',
      ...SECURITY_HEADERS,
    }
  });
}
