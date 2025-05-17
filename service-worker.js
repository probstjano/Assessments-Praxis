const CACHE_NAME = 'assessment-praxis-v3';
const ASSETS_TO_CACHE = [
  '30s_assissted.html',
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
  'Zusatzmaterial/BBS_Protokoll.pdf',
  'Zusatzmaterial/DEMMI_Protokoll.pdf',
  'Zusatzmaterial/FES_I_Deutsch.pdf',
  'Zusatzmaterial/FSST_protokoll.pdf',
  'Zusatzmaterial/GDS_15_Deutsch.pdf',
  'Zusatzmaterial/ISI-Deutsch.pdf',
  'Zusatzmaterial/PSFS_GAS_Kurzmanual.pdf',
  'Zusatzmaterial/SPPB_Protokoll.pdf',
  'icon.png',
  'manifest.json',
  'Hauptseite.html'
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
