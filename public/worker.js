async function networkFirst(request, cacheName, isHTML = false) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      if (request.method === 'GET') {
        const cache = await caches.open(cacheName)
        cache.put(request, networkResponse.clone())
      }
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (isHTML) {
      return cachedResponse || (await caches.match('/'))
    }

    return cachedResponse || Response.error()
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (url.pathname.match(/\.json/) || url.protocol.includes('chrome-extension')) {
    return
  }

  if (url.pathname.match(/\.js/)) {
    event.respondWith(networkFirst(event.request, 'MyCache_HTML'))
  } else if (url.pathname.match(/\.css/)) {
    event.respondWith(networkFirst(event.request, 'MyCache_HTML'))
  } else if (url.pathname.startsWith('/rest/')) {
    event.respondWith(networkFirst(event.request, 'MyCache_API'))
  } else {
    event.respondWith(networkFirst(event.request, 'MyCache_HTML', true))
  }
})

self.addEventListener('install', async () => {
  self.skipWaiting()
})

self.addEventListener('activate', async () => {
  console.log('PWA Activated')
})
