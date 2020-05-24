importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js',
)

if (workbox) {
  workbox.precaching.precacheAndRoute([
    {
      url: '/',
      revision: '1',
    },
  ])

  workbox.routing.registerRoute(
    /\.(?:js|css|html)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'static-resources',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 30, // 15 Days
        }),
      ],
    }),
  )

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  )
}
