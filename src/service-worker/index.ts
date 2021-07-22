/// <reference lib="webworker" />

import { build, files, timestamp } from '$service-worker';

const worker = (self as unknown) as ServiceWorkerGlobalScope;
const cacheName = `cache${timestamp}`;

worker.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  worker.skipWaiting();
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(build.concat(files));
    })(),
  );
});

worker.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })(),
  );
});

worker.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const keys = await caches.keys();
      for (const key of keys) {
        if (key !== cacheName) await caches.delete(key);
      }
    })(),
  );
});
