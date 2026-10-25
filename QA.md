# PILI verification — 26 October 2026

Passed during development:
- JavaScript syntax checks for inline application and service worker.
- Browser: load empty collection, open sample collection, compare two sample products.
- Browser: save supplied TikTok short link with manual product name, PHP 1,299 price and Shortlist status.
- Browser: reload retains saved item via IndexedDB.
- Browser: budget PHP 5,000 with PHP 1,299 committed correctly displays PHP 3,701 remaining.
- Visual review at desktop and 390 px phone-width iframe.
- Backup validator: valid envelope accepted; unsupported version, duplicate IDs, negative price and javascript: links rejected.
- Manifest asset existence, icon dimensions and service-worker syntax checked.
- Worker request-boundary and cache-isolation mocked checks passed by asset agent.

Limitations:
- Actual Android/iOS installation and offline relaunch need a live HTTPS deployment and were not device-tested in this HTTP preview.
- Image picker/compression and downloadable backup import/export have code validation but have not completed an end-to-end device file-picker test.
- No live store metadata, price updates, checkout, accounts or cross-device sync.

Test data was created only in the development browser; no saved finds or personal backups are bundled in the files.
