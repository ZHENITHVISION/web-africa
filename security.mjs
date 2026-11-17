import fs from 'node:fs';
import crypto from 'node:crypto';

export function headersFor(html='', pathname=''){
  const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me;";
  return {
    'Content-Security-Policy': csp,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Cache-Control': 'public, max-age=0, must-revalidate'
  };
}

export function writeSecurityFiles(){
  const h = headersFor();
  const lines = ['/*', ...Object.entries(h).map(([k,v]) => '  ' + k + ': ' + v)];
  fs.writeFileSync('dist/_headers', lines.join('\n') + '\n');
  fs.writeFileSync('dist/_redirects', '/realisations /demonstrations/ 301\n/realisations/ /demonstrations/ 301\n/realisations/* /demonstrations/:splat 301\n');
}
