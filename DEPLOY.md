# Publishing the site

Live site: https://eduardomunoz.me. Apache serves `/var/www/PersonalPortfolio/current`, a symlink to a folder in `releases/`.

## Normal flow (automatic)
Commit and push to `main` on `github.com/smvckerz/PersonalPortfolio`. The workflow `.github/workflows/deploy.yml` then:
1. installs dependencies and runs `npm run build` (Node version from `.nvmrc`);
2. rsyncs `build/` to a new `releases/<timestamp>-<sha>` folder on the Pi using the upload key;
3. activates it with the activate key, whose forced command on the server re-points `current`;
4. keeps the 5 newest releases.

You can also run it from the repo's Actions tab ("Run workflow").

GitHub Actions secrets it uses: `DEPLOY_HOST`, `DEPLOY_USER`, `UPLOAD_KEY_B64` (base64 upload key), `DEPLOY_KEY` (activate key).

## Manual deploy (on the Pi)
```bash
cd /var/www/PersonalPortfolio
npm ci && npm run build
R=releases/$(date -u +%Y%m%d-%H%M%S)-manual
sudo mkdir -p $R && sudo cp -r build/. $R/
sudo ln -sfn /var/www/PersonalPortfolio/$R current
```

## Rollback
```bash
ls -t /var/www/PersonalPortfolio/releases
sudo ln -sfn /var/www/PersonalPortfolio/releases/<older-release> /var/www/PersonalPortfolio/current
```

## Updating the resume
Replace `public/Eduardo_Munoz_Resume.pdf`, commit and push. The site links to `/Eduardo_Munoz_Resume.pdf`.

## Python console backend
The terminal at `/console` runs `python <file>` through `server.js` (listens on `127.0.0.1:4000`, started with `pm2 start server.js --name portfolio-exec` and `pm2 save`). Apache proxies `/api/` to it (`ProxyPass /api/ http://127.0.0.1:4000/`, with `RewriteCond %{REQUEST_URI} !^/api/` ahead of the SPA fallback rule).

Each run happens in a throwaway `python:3.11-alpine` Docker container: no network, no capabilities, read-only filesystem, non-root user, and a 5 s limit. The Pi kernel has no memory cgroup, so memory, process, file-size and CPU limits are set with `resource.setrlimit` inside the container. Limits per visitor: 10 runs a minute; 2 runs at a time overall. The frontend calls `/api` (`REACT_APP_API_URL` overrides it).

Restart after editing `server.js`: `pm2 restart portfolio-exec`. The user running pm2 must be in the `docker` group, and the image must be pulled (`docker pull python:3.11-alpine`).

