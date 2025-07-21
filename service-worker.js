const CACHE_NAME = 'assessment-praxis-v7';
const ASSETS_TO_CACHE = [
  '30s_assissted.html',
  '6MWT.html',
  '5xsit-stand.html',
  'BBS.html',
  'DEMMI.html',
  'FiST.html',
  'FSMC.html',
  'FSST.html',
  'FES-I.html',
  'GDS.html',
  'Gaitspeed.html',
  'ISI.html',
  'MCTSIB.html',
  'PSFS_GAS.html',
  'SARA.html',
  'SPPB.html',
  'TUG.html',
  'Trunk Impairment Scale.html',
  'tinetti.html',
  'BBS_Protokoll.pdf',
  'DEMMI_Protokoll.pdf',
  'FES_I_Deutsch.pdf',
  'FSST_protokoll.pdf',
  'GDS_15_Deutsch.pdf',
  'ISI-Deutsch.pdf',
  'PSFS_GAS_Kurzmanual.pdf',
  'SPPB_Protokoll.pdf',
  '6MWT_Protokoll.pdf',
  'MniBEST_Protokoll.pdf',
  'MiniBEST.html',
  'icon.png',
  'manifest.json',
  'index.html',
  'DGI.html',
  'DHI.html',
  'Braincheck.html',
  'CTSIB_full.html',
  
  
];

// Neue Version sofort aktiv
self.addEventListener('install', (event) => {
  self.skipWaiting(); // ⚡ aktiviert sofort
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Alte Caches löschen + Kontrolle übernehmen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // ⚡ sofort übernehmen
});

// Netzwerkabfragen: zuerst Cache, dann Netzwerk
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
