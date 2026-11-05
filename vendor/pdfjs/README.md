# Vendored PDF.js — BUILDER INSTRUCTIONS

**DO NOT load PDF.js from a CDN.** The extension CSP is `script-src 'self'`.
Remote scripts are blocked. All PDF.js code must be local.

## What the BUILDER must do

1. Download the latest stable PDF.js release (v4.x) from:
   `https://github.com/mozilla/pdf.js/releases`

2. Extract these two files into this directory (`src/vendor/pdfjs/`):
   - `pdf.min.mjs` (main module)
   - `pdf.worker.min.mjs` (worker)

3. The webpack CopyWebpackPlugin copies this entire directory to
   `dist/vendor/pdfjs/` at build time.

4. In `pdfviewer.ts`, load via dynamic import:
   ```typescript
   const pdfjs = await import('../vendor/pdfjs/pdf.min.mjs');
   pdfjs.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('vendor/pdfjs/pdf.worker.min.mjs');
   ```

5. Verify: open DevTools Network on pdfviewer.html after loading a PDF.
   There must be ZERO requests to CDN domains. Only `chrome-extension://` URLs.

## Why this matters

- MV3 CSP blocks remote scripts.
- CDN dependency = remote code execution = CWS rejection.
- Vendored = auditable, reproducible, offline-capable.

## Version

Pin to a specific PDF.js release tag. Record the version here once vendored:

```
PDF.js version: 4.0.379
Release date:   2024 (Mozilla PDF.js v4.0.379 stable)
Source:         https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs
```
