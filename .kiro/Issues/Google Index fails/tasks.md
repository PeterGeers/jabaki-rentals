# Google Index Fails - Tasks

## Fix 1: Change 302 redirect to 301 in Amplify

- [x] Update Amplify custom rule from 302 (temporary) to 301 (permanent) redirect for `https://jabaki.nl` → `https://www.jabaki.nl`
- Command: `aws amplify update-app --app-id d3o2lhpialp6vl --region eu-west-1 --custom-rules '[{"source":"https://jabaki.nl","target":"https://www.jabaki.nl","status":"301"},{"source":"/<*>","target":"/index.html","status":"404-200"}]'`

## Fix 2: Update baseUrl in SEO config

- [x] Change `baseUrl` in `frontend/src/config/seo.config.ts` from `https://jabaki.nl` to `https://www.jabaki.nl`
- This ensures canonical URLs match the primary domain and Google won't see duplicates

## Fix 3: Request re-indexing for 404 pages

- [ ] In Google Search Console, request re-indexing for `https://www.jabaki.nl/events`
- [ ] In Google Search Console, request re-indexing for `https://www.jabaki.nl/good-to-know`
- These pages exist as SPA routes but Google cached old 404 status from Dec 2025

## Fix 4: myadmin.jabaki.nl duplicate pages

- [ ] Ensure `myadmin.jabaki.nl` has its own canonical tags pointing to itself (handled in the myadmin app, not this repo)
- Pages `https://myadmin.jabaki.nl/nl` and `https://myadmin.jabaki.nl/nl/privacy` are seen as duplicates by Google

## Fix 5: Verify and redeploy

- [ ] Run `npm run test:run` in frontend to verify no tests break after baseUrl change
- [ ] Run `npm run build` to verify build succeeds
- [ ] Deploy changes via `git push origin main`
- [ ] Monitor Google Search Console over the next 1-2 weeks for improvements
