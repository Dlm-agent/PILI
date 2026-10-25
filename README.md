# PILI — Choose what matters

A clean personal shopping wishlist built for Reymark. No build tools, accounts, external icon packs or dependencies. All interface icons, logo and sample illustrations were drawn specifically for this app.

## Quick start on GitHub Pages

1. Extract the ZIP. Upload its **contents** to the root of your GitHub repository: `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll`, and `assets/`. Keep their names and folder structure.
2. Open repository **Settings → Pages**. Select **Deploy from a branch**, then your branch (usually `main`) and **/(root)**. Save.
3. Wait for GitHub to publish and open its provided HTTPS URL. For a project repository it normally looks like `https://USERNAME.github.io/REPOSITORY/`.
4. Open the site once online. On Android Chrome, tap **Install** in PILI or the browser menu's install/add-to-home-screen option. On iPhone, use Safari → Share → Add to Home Screen. Availability varies by browser.
5. Test a saved find and export a backup before relying on your collection.

Upload the entire package, not just index.html: the separate manifest, worker and icon files enable installation and offline support. You do not need npm or a build command. For local development, serve the directory on localhost with `python3 -m http.server 8080`; opening a file directly does not enable the PWA.

## What is included

- `index.html`: complete responsive interface, inline CSS/JS and original interface SVG icons.
- `manifest.webmanifest`: install metadata and relative paths for GitHub project subdirectories.
- `sw.js`: scoped, versioned offline app-shell cache.
- `assets/`: original logo SVG and 192/512 PNG installation icons plus Apple icon.
- `IMPLEMENTATION_PLAN.md`: detailed execution plan, ownership and data model.
- `QA.md`: completed checks and remaining device tests.

## Use PILI

**Save:** Add a find → paste a TikTok or other product link → enter its name and total price (PHP, including shipping) → upload a product screenshot/photo or enter a direct HTTPS image URL → Save.

**Organize:** Use Tech, Style, Home or Other; set Need it, Considering or Nice to have; keep a find saved, shortlisted or bought. Edit any find using its pencil button. Search matches product names, notes and links; sorting supports date, price and priority.

**Compare:** Use the + on two or three cards, then Compare finds. Prices are manually entered. The Budget fit row compares each price to the whole budget, not the remaining budget.

**Budget:** Set a limit using the budget pencil or App tools. Shortlisted plus bought products count as committed money. Saved-only finds do not. Zero means no budget is set. This is a collection budget, not monthly accounting.

**Pause:** Optional 24-hour thinking-pause label encourages considered decisions. It does not block purchases, notify you in the background or automatically change status. Reopen/refresh to update elapsed-time labels.

**Purchase:** View product opens the original shopping site. PILI does not sell products, process checkout, verify sellers or track live prices.

**Sample:** The empty collection has an Explore a sample collection button. Samples are original illustrations with fictional prices, not merchant listings. They are not saved or exported.

## Photos and TikTok

TikTok links are saved as links; this static app does not automatically retrieve TikTok thumbnails, titles or prices. Upload a screenshot or use a direct image URL. Uploaded JPG/PNG/WebP images up to 10 MB are resized to a maximum 1000 px dimension and stored as JPEG locally. Uploaded images can work offline; external image URLs need a connection and may expire or refuse loading. Uploading a screenshot is the most reliable option. No public CORS proxies are used.

## Data and backups

Data is kept in IndexedDB in this browser on this device and origin. There is no server, account, cloud sync or automatic backup. Clearing site data, using another browser/domain, private browsing or storage eviction may lose access to the list.

Use **Export backup** regularly. **Import backup** validates a PILI version-1 JSON file (maximum 50 MB / 3,000 finds), then asks before replacing your current collection. Exported backups include your product details and uploaded images: keep them private and do not commit them to GitHub. All existing data remains unchanged if an import validation or transaction fails. A total backup larger than 50 MB cannot be imported; reduce photo-heavy collections before reaching that size.

## Offline and updates

Visit online first so the worker can cache the shell. The app's local features and uploaded images are designed to work offline; merchant pages and externally hosted photos are not. Actual phone installation and offline relaunch still require testing on the deployed HTTPS site (see QA.md).

When updating any shell file, bump `VERSION` in `sw.js`. Upload the complete changed files. Close all PILI tabs and installed windows, then reopen so a waiting worker activates. Do not clear your collection to update. Caches are scoped to this app and do not remove unrelated caches.

## Reference documentation

- GitHub Pages publishing: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- PWA installation requirements: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
