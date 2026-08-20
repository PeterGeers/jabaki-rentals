---
inclusion: manual
---

# Environment Configuration

## API Endpoints

| Environment | Frontend URL | Backend API |
|-------------|-------------|-------------|
| Production | https://jabaki.nl | https://api.jabaki.nl (API Gateway) |
| Development | http://localhost:3000 | http://localhost:8000 (local server) |

## Dev Server Proxy

Vite proxies `/api` requests to `http://localhost:8000` in development (configured in `vite.config.ts`).

In production, the frontend calls the API Gateway endpoint directly (configured in `src/utils/googleImages.ts`).

## Backend Local Development

Run the local backend server:
```bash
cd backend
python server.py
```

This starts a local server on port 8000 that mimics the Lambda + API Gateway behavior.

## Key Environment Variables

- `CI` — Set to `true` in Amplify builds; disables prerendering (Puppeteer unavailable)
- `AWS_APP_ID` / `AWS_BRANCH` — Amplify environment indicators
- Google Drive API credentials are stored in the Lambda environment (not in frontend code)

## Google Drive Image Configuration

- Images stored in shared Google Drive folders
- File IDs mapped in `frontend/src/data/images.json`
- Lambda converts Drive file IDs → public `lh3.googleusercontent.com` URLs
- Development uses `/api/google-image/{fileId}` (proxied to local backend)
- Production uses the full API Gateway URL
