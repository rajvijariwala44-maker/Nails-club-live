const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'backend', 'data');
const STATE_FILE = path.join(DATA_DIR, 'live-state.json');
const DEFAULT_STATE_FILE = path.join(DATA_DIR, 'default-state.json');
const PORT = Number(process.env.PORT || 3000);
const MAX_BODY_BYTES = 8 * 1024 * 1024;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function ensureDataFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STATE_FILE)) {
    const seed = fs.existsSync(DEFAULT_STATE_FILE)
      ? fs.readFileSync(DEFAULT_STATE_FILE, 'utf8')
      : JSON.stringify({ appointments: [], customOrders: [] }, null, 2);
    fs.writeFileSync(STATE_FILE, seed);
  }
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Payload too large'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function normalizeState(input) {
  const state = input && typeof input === 'object' ? input : {};
  return {
    hero: state.hero || {},
    services: Array.isArray(state.services) ? state.services : [],
    catalogItems: Array.isArray(state.catalogItems) ? state.catalogItems : [],
    appointments: Array.isArray(state.appointments) ? state.appointments : [],
    customOrders: Array.isArray(state.customOrders) ? state.customOrders : [],
    users: Array.isArray(state.users) ? state.users : [],
    mediaLibrary: Array.isArray(state.mediaLibrary) ? state.mediaLibrary : []
  };
}

async function handleApi(req, res) {
  ensureDataFile();

  if (req.url === '/api/health') {
    sendJson(res, 200, { ok: true, service: 'AURA website' });
    return true;
  }

  if (req.url === '/api/state' && req.method === 'GET') {
    const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    sendJson(res, 200, state);
    return true;
  }

  if (req.url === '/api/state' && req.method === 'POST') {
    try {
      const body = await readRequestBody(req);
      const parsed = JSON.parse(body || '{}');
      const nextState = normalizeState(parsed);
      fs.writeFileSync(STATE_FILE, JSON.stringify(nextState, null, 2));
      sendJson(res, 200, { ok: true });
    } catch (error) {
      sendJson(res, error.status || 400, { ok: false, error: error.message });
    }
    return true;
  }

  return false;
}

function safeStaticPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const requested = decoded === '/' ? '/index.html' : decoded;
  const absolute = path.normalize(path.join(ROOT, requested));
  return absolute.startsWith(ROOT) ? absolute : null;
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/')) {
    const handled = await handleApi(req, res);
    if (!handled) sendJson(res, 404, { ok: false, error: 'Not found' });
    return;
  }

  const filePath = safeStaticPath(req.url);
  if (!filePath) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const target = fs.existsSync(filePath) && fs.statSync(filePath).isFile()
    ? filePath
    : path.join(ROOT, 'index.html');

  const ext = path.extname(target).toLowerCase();
  res.writeHead(200, { 'content-type': MIME_TYPES[ext] || 'application/octet-stream' });
  fs.createReadStream(target).pipe(res);
});

server.listen(PORT, () => {
  ensureDataFile();
  console.log(`AURA website running on http://localhost:${PORT}`);
});
