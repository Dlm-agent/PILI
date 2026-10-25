# PILI — detailed execution plan and final implementation map

## Product goal

Provide Reymark a calm mobile-first space to save shopping links, see a product photo, compare alternatives and plan purchases within a chosen PHP budget. Deliver a portable buildless GitHub Pages project. Checkout remains on the merchant's site.

## Visual and behavioral strategy

- Use warm cream surfaces, dark ink text and one terracotta action accent; reserve strong contrast for the next useful action.
- Keep navigation to All finds, Shortlist and Bought. Use the same card structure across views to reduce relearning.
- Make photo, product name and price the card hierarchy; place secondary actions below.
- Limit comparison to three finds to keep the decision manageable on a phone.
- Make committed spending visible before visiting the merchant; distinguish saved wishes from shortlisted commitments.
- Optional thinking pause and a personal why-it-fits note encourage reflection. Avoid fake urgency, fabricated discounts, countdown sales or social-proof claims.
- Begin with honest empty states; keep fictional sample products clearly separated from real saved products.
- Use original vector paths for icons/logo and original sample illustrations. No icon fonts or external dependencies.

## Agent responsibilities and dependency order

### Owner: application and integration

1. Establish relative file paths and single index.html with inline CSS and JavaScript.
2. Build page shell: desktop sidebar, mobile navigation, budget summary, filters/search/sort, product grid, accessible dialogs.
3. Implement IndexedDB adapter: load and validate state, await transaction completion before reporting save, retain old state on write failure. Disable writes if loading fails so unreadable data is not overwritten.
4. Implement create/edit flow: HTTP(S) link validation, required name/price, categories, status, priority, notes, optional pause, duplicate exact-link detection.
5. Compress uploaded images with canvas after successful decoding; preview image; offer direct HTTPS URL and remove action. Keep uploaded images in the exported state.
6. Derive shortlist/bought totals and budget remaining. Implement compare, edit, remove confirmation, search and sorting.
7. Implement versioned JSON export and validated import with explicit replacement confirmation.
8. Integrate asset agent's logo, PNG icons, manifest and worker. Add Android install-prompt handling and manual iOS instructions.
9. Check syntax, validate backup edge cases, exercise browser workflows, inspect desktop and phone-width layout.
10. Package only deployable source/docs; exclude preview dist duplicates, testing pages, helper scripts and browser data.

### Asset/PWA agent: bounded parallel work

Own assets/, manifest.webmanifest, sw.js and initial documentation only. Do not edit index.html.

1. Draw original shopping-bag P/check mark in SVG with generous safe margins.
2. Render antialiased opaque 192/512 PNG icons and 180 px Apple icon.
3. Declare relative start_url/scope and standalone display; ensure icon references exist.
4. Precache only local app-shell assets. Handle same-origin scoped GET requests only; leave third-party, range and write requests untouched.
5. Use scoped cache names, explicit versioning and waiting updates. Do not delete other apps' caches or force reload active clients.
6. Validate SVG, PNG dimensions, manifest and worker request/cache boundaries.
7. Hand off integration requirements and accurate installation/offline limitations.

Owner reconciles documentation with the final code and owns final validation/package. Agent completed assets; owner completed application and final docs.

## Actual data contract

IndexedDB database `pili-v1`, object store `data`, key `state`:

`{ version: 1, budget: number, items: Product[] }`

| Field | Rules |
| --- | --- |
| id | Unique alphanumeric/hyphen ID, 1–80 chars; random local ID |
| name | Required trimmed product name, max 100 chars |
| url | Required absolute HTTP(S) URL, max 2000 chars, no embedded credentials |
| price | Finite nonnegative PHP amount, max 999999999; entered with cent precision |
| image | Empty, HTTPS URL or base64 PNG/JPEG/WebP; import bound 3 million chars |
| category | Tech / Style / Home / Other |
| priority | need / considering / nice |
| status | saved / planned / bought |
| notes | Plain text, max 600 chars |
| pause | Boolean |
| created | Nonnegative finite Unix timestamp in milliseconds |

Limits: 3,000 finds; 10 MB source photo; 1000 px compressed photo max dimension; 50 MB backup import. Browser storage quota may impose a lower limit. Amounts are JavaScript numbers displayed through Intl currency formatting; this is a personal planner, not a financial ledger. Rejected imports do not mutate committed state.

## Acceptance checks and remaining gates

See QA.md for checks actually completed. Continue with:

- Live HTTPS install on Android and iOS; icon appearance and standalone launch.
- Offline relaunch after successful precache; save/edit uploaded-photo records offline.
- File-picker photo upload and JSON export/import round trip on a real phone.
- Quota failure, large collection behavior and low-memory image decoding.
- Keyboard/screen-reader flow, modal focus, 320 px layout and long content.
- App update with waiting worker; verify user data survives and cache isolation remains correct.

No automatic TikTok scraping, authentication, checkout or cross-device synchronization is part of this release. Any future metadata backend must be a separate planned integration rather than an assumed static capability.
