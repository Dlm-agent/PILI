/* PILI offline shell. Bump VERSION whenever a shell asset changes. */
'use strict';
const VERSION = 'v1';
// Scope-specific prefix prevents deleting another app's caches on shared hosting.
const PREFIX = `pili:${self.registration.scope}:`;
const CACHE = `${PREFIX}${VERSION}`;
const SHELL_PATHS = [
  './', './index.html', './manifest.webmanifest',
  './assets/logo.svg', './assets/icon-192.png',
  './assets/icon-512.png', './assets/apple-touch-icon.png'
];
const SHELL_URLS = SHELL_PATHS.map(path => new URL(path, self.registration.scope).href);
const SHELL_SET = new Set(SHELL_URLS);

self.addEventListener('install', event => {
  // Atomic precache: a missing index or icon fails installation, keeping the old worker.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL_URLS)));
  // No skipWaiting: an update waits until existing controlled tabs close.
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  // Leave external resources, writes, ranges and other apps entirely to the browser.
  if (request.method !== 'GET' || url.origin !== scope.origin ||
      !url.pathname.startsWith(scope.pathname) || request.headers.has('range')) return;

  // Single-page entry only: do not turn missing assets/other routes into HTML.
  const entry = url.pathname === scope.pathname ||
    url.pathname === new URL('index.html', scope).pathname;
  if (request.mode === 'navigate' && entry) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      // Serve the installed version consistently with its precached assets.
      const cached = await cache.match(new URL('index.html', scope).href);
      return cached || fetch(request);
    })());
    return;
  }
  if (!SHELL_SET.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return (await cache.match(request)) || fetch(request);
  })());
});
