# Publishing the site

Live site: https://eduardoemunoz.com. Apache serves `/var/www/PersonalPortfolio/current`, a symlink to a folder in `releases/`.

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
