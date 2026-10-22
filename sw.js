/* ChipWreck offline service worker (generated at build time from src/sw-template.js). */
const BUILD = "2610222234";
const CORE = ["./","assets/im-fell-english-latin-400-normal-BhowGHCQ.woff2","assets/im-fell-english-latin-400-italic-DD_ylKHZ.woff2","assets/im-fell-english-latin-400-italic-hN89MLGX.woff","assets/im-fell-english-latin-400-normal-CxhBQSzl.woff","assets/index-fVTkn4nC.css","assets/admin-RIuWhr_Y.css","assets/index-CnwdZzUo.js","assets/admin-9TTIpIMb.js","assets/index-T0LSmlZh.js","assets/ai.worker-cP3ezzaq.js","version.json","app-logo-120.png","apple-touch-icon.png","cards/art/capacity.webp","cards/art/compass.webp","cards/art/driftwood.webp","cards/art/fishing.webp","cards/art/flotsam.webp","cards/art/fog.webp","cards/art/harpoon.webp","cards/art/iceberg.webp","cards/art/kraken.webp","cards/art/pirates.webp","cards/art/plank.webp","cards/art/ricochet.webp","cards/art/seasick.webp","cards/art/shark.webp","cards/art/winds.webp","cards/cannon.webp","cards/capacity.webp","cards/driftwood.webp","cards/fishing.webp","cards/flotsam.webp","cards/fog.webp","cards/frames/boon.webp","cards/frames/curse.webp","cards/frames/hazard.webp","cards/frames/weather.webp","cards/harpoon.webp","cards/iceberg.webp","cards/kraken.webp","cards/pirates.webp","cards/winds.webp","eggs/boomtown/blueprint-timber-mill.webp","eggs/boomtown/card-casino.webp","eggs/boomtown/card-church.webp","eggs/boomtown/card-claims-office.webp","eggs/boomtown/card-dispensary.webp","eggs/boomtown/card-general-store.webp","eggs/boomtown/card-library.webp","eggs/boomtown/card-museum.webp","eggs/boomtown/card-oil-derrick.webp","eggs/boomtown/card-post-office.webp","eggs/boomtown/card-settlement.webp","eggs/boomtown/card-stables.webp","eggs/boomtown/card-theatre.webp","eggs/boomtown/card-timber-mill.webp","eggs/boomtown/card-train-station.webp","eggs/boomtown/card-university.webp","eggs/boomtown/card-water-tower.webp","eggs/boomtown/logo.webp","eggs/boomtown/mayor.webp","eggs/boomtown/saloon-doors.webp","eggs/boomtown/town-autumn.webp","eggs/boomtown/town-summer.webp","eggs/boomtown-tumbleweed.webp","eggs/fliptide-logo.webp","favicon-32.png","home-bg.webp","icon-192.png","icon-512.png","icon-maskable-512.png","legal.css","logo.webp","manifest.webmanifest","modes/legend.webp","modes/survival.webp","modes/versus.webp","og-image.jpg","privacy.html","scenes/boomtown.webp","scenes/cafe.webp","scenes/deck.webp","scenes/island.webp","scenes/random.webp","scenes/reef.webp","scenes/table.webp","scenes/tavern.webp","scenes/treasury.webp","terms.html","textures/chips.jpg","textures/chips.webp"];
const MUSIC = ["music/low-tide.mp3","music/wreckers-tavern.mp3"];
const CACHE = `chipwreck-${BUILD}`;
const EXTRA = 'chipwreck-extra'; // uploaded artwork and other pictures from elsewhere, kept across releases

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('chipwreck-') && k !== CACHE && k !== EXTRA) await caches.delete(k);
    await self.clients.claim();
    // The music, in the background (one track at a time so play isn't slowed).
    const c = await caches.open(CACHE);
    for (const url of MUSIC) {
      if (await c.match(url)) continue;
      try {
        const r = await fetch(url);
        if (r.ok) await c.put(url, r);
      } catch {
        break; // offline: try again next time
      }
    }
  })());
});

// The page asks whether the whole game is saved yet (for "Ready to play offline").
self.addEventListener('message', (event) => {
  if (event.data !== 'offline?') return;
  event.waitUntil((async () => {
    const c = await caches.open(CACHE);
    let ready = true;
    for (const url of CORE) if (!(await c.match(url, { ignoreSearch: true }))) { ready = false; break; }
    event.source?.postMessage({ offlineReady: ready });
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;

  if (same && (req.mode === 'navigate' || url.pathname.endsWith('/version.json'))) {
    // The page and the version stamp: fresh when online, the saved copy when not.
    event.respondWith((async () => {
      try {
        const r = await fetch(req);
        return r;
      } catch {
        const c = await caches.open(CACHE);
        return (await c.match(req, { ignoreSearch: true })) ?? (await c.match('./')) ?? Response.error();
      }
    })());
    return;
  }

  if (same) {
    // Game files: the saved copy straight away; anything not saved yet is fetched and kept.
    event.respondWith((async () => {
      const c = await caches.open(CACHE);
      const hit = await c.match(req, { ignoreSearch: true });
      if (hit) return hit;
      const r = await fetch(req);
      if (r.ok && r.type === 'basic') c.put(req, r.clone());
      return r;
    })());
    return;
  }

  if (req.destination === 'image' || req.destination === 'font' || /\.(png|jpe?g|webp|gif|glb|mp3|ogg|m4a|woff2?)$/i.test(url.pathname)) {
    // Uploaded artwork, scene models and sounds (the editor's), and web fonts: fresh when online, kept for offline.
    event.respondWith((async () => {
      const c = await caches.open(EXTRA);
      try {
        const r = await fetch(req);
        if (r.ok || r.type === 'opaque') c.put(req, r.clone());
        return r;
      } catch {
        return (await c.match(req)) ?? Response.error();
      }
    })());
  }
  // Everything else (sign-in, online play, the theme service) goes straight to the network.
});
