const CACHE_NAME = "omnitext-cache-v1.0.2"; // A versioned name for your cache
const ASSETS_TO_CACHE = [
  "./", // Cache the root URL (usually index.html)
  "./index.html", // Explicitly cache index.html
  "./manifest.json", // Cache the manifest file
  "./sw.js", // Cache the service worker itself
  "https://cdn.tailwindcss.com", // Cache the Tailwind CSS CDN
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap", // Cache the Google Fonts CSS link
  // icons
  "./icons/icon-48x48.png",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-256x256.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
];

// Install event: Caches static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Install event");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static assets");
        // We use fetch and catch to handle potential failures with CDN assets gracefully
        // without preventing the installation of the service worker.
        return Promise.all(
          ASSETS_TO_CACHE.map((url) => {
            return fetch(url)
              .then((response) => {
                if (!response.ok) {
                  console.warn(
                    `Service Worker: Failed to fetch ${url}: ${response.status}`,
                  );
                  return Promise.reject(`Failed to fetch ${url}`);
                }
                // Don't cache opaque responses if you can't access them (e.g., some CDNs)
                // Although fetch() with mode 'no-cors' can cache opaque responses.
                // For simplicity here, we'll cache all successful fetches.
                return cache.put(url, response);
              })
              .catch((err) => {
                console.error(`Service Worker: Error caching ${url}`, err);
                // Allow install to proceed even if some optional assets fail
                return Promise.resolve();
              });
          }),
        );
      })
      .then(() => self.skipWaiting()) // Activate the new service worker immediately
      .catch((err) => {
        console.error("Service Worker: Installation failed", err);
      }),
  );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activate event");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()), // Take control of pages without a refresh
  );
});

// Fetch event: Intercept network requests and serve from cache or network
self.addEventListener("fetch", (event) => {
  // We only handle GET requests for navigation and standard assets
  if (
    event.request.method !== "GET" ||
    event.request.url.startsWith("chrome-extension://")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If cached response is found, return it
      if (cachedResponse) {
        console.log("Service Worker: Serving from cache:", event.request.url);
        return cachedResponse;
      }

      // Otherwise, fetch from the network
      console.log("Service Worker: Fetching from network:", event.request.url);
      return fetch(event.request)
        .then((response) => {
          // Check if we received a valid response
          // Basic type check is needed for CDNs which are 'opaque' responses
          // if (!response || response.status !== 200 || response.type !== 'basic') { // Uncomment for strict basic type
          if (!response || response.status !== 200) {
            // A bit more relaxed, might cache opaque
            console.log(
              "Service Worker: Not caching response for",
              event.request.url,
              "status:",
              response.status,
              "type:",
              response.type,
            );
            return response; // Don't cache error responses or redirects etc.
          }

          // Clone the response because it's a stream and can only be consumed once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            console.log(
              "Service Worker: Caching new response for",
              event.request.url,
            );
            cache.put(event.request, responseToCache); // Cache the network response
          });

          return response; // Return the network response
        })
        .catch((error) => {
          // Handle network errors (e.g., user is offline)
          console.error(
            "Service Worker: Fetch failed:",
            event.request.url,
            error,
          );
          // Optional: Serve a fallback page for navigation requests if offline
          // For this simple app, it will likely just result in the browser's default offline page
          // A more robust PWA might check event.request.mode === 'navigate' and serve a specific offline.html
          // return caches.match('/offline.html'); // Example of serving an offline page
        });
    }),
  );
});
