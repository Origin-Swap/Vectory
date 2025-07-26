const CACHE_NAME = 'cool-cache';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/assets/icon-192x192.png',
    '/assets/icon-512x512.png',
    '/src/main.js',
    '/avatar/Av2.png',
    '/src/styles.css'
    // Add more files that are required for the app to work offline
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => caches.match('/fallback.html')) // Serve a fallback page if offline
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-user-actions') {
    event.waitUntil(syncUserActions());
  }
});

async function syncUserActions() {
  try {
    // Fetch pending actions from IndexedDB or local storage
    const pendingActions = await getPendingActions();

    for (const action of pendingActions) {
      // Send each action to the server
      await fetch(action.url, {
        method: action.method,
        headers: action.headers,
        body: JSON.stringify(action.body),
      });

      // Mark the action as synced
      await markActionAsSynced(action.id);
    }

    console.log('All actions synced successfully!');
  } catch (error) {
    console.error('Error syncing actions:', error);
  }
}

/* <script>
  if (typeof navigator.serviceWorker !== 'undefined') {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  }
</script> */
