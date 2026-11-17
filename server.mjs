import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {headersFor} from './security.mjs';

const base = fs.realpathSync('dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer({ maxHeaderSize: 8192 }, (req, res) => {
  let h = headersFor();
  const reply = (status, body = '') => {
    res.writeHead(status, h);
    res.end(req.method === 'HEAD' ? '' : body);
  };

  if (!['GET', 'HEAD'].includes(req.method)) {
    h.Allow = 'GET, HEAD';
    return reply(405, 'Méthode non autorisée');
  }

  if ((req.url?.length || 0) > 4096) return reply(414, 'Adresse trop longue');

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return reply(400, 'Adresse incorrecte');
  }

  if (/[\\\x00-\x1f]/.test(pathname) || pathname.split('/').some(x => x.startsWith('.')) || /%[0-9a-f]{2}/i.test(pathname)) {
    return reply(400, 'Adresse incorrecte');
  }

  if (pathname === '/realisations' || pathname.startsWith('/realisations/')) {
    h.Location = pathname.replace('/realisations', '/demonstrations');
    return reply(301);
  }

  let file = path.resolve(base, '.' + pathname);
  if (file !== base && !file.startsWith(base + path.sep)) return reply(403);

  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!pathname.endsWith('/')) {
        h.Location = pathname + '/';
        return reply(301);
      }
      file = path.join(file, 'index.html');
    }

    let status = 200;
    if (!fs.existsSync(file)) {
      file = path.join(base, '404.html');
      status = 404;
    }

    const real = fs.realpathSync(file);
    if (!real.startsWith(base + path.sep) || !fs.statSync(real).isFile()) return reply(403);

    const ext = path.extname(real);
    if (!types[ext]) return reply(404);

    const data = fs.readFileSync(real);
    if (ext === '.html') h = headersFor(data.toString('utf8'));
    h['Content-Type'] = types[ext];
    h['Content-Length'] = data.length;
    res.writeHead(status, h);
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    return reply(500, 'Impossible de charger cette page');
  }
});

server.requestTimeout = 15000;
server.headersTimeout = 10000;
server.keepAliveTimeout = 5000;
server.maxRequestsPerSocket = 100;
server.on('clientError', (_, socket) => socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n'));

const PORT = Number(process.env.PORT || 4173);
server.listen(PORT, '127.0.0.1', () => console.log('Local: http://127.0.0.1:' + PORT));
