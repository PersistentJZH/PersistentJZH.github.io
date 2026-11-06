# my-vuepress-site

The Site is generated using [vuepress](https://vuepress.vuejs.org/) and [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume)

## Install

```sh
npm i
```

## Usage

English articles live under `docs/en/`, mirroring the Chinese article directories and using `/en` plus the original permalink. When adding or changing a Chinese article, update its complete English translation, date, cover, tags, and internal links. Refresh the translation's `sourceHash` only after synchronizing the text; it is the SHA-256 of the Chinese source file with LF line endings. English navigation and sidebar labels are maintained in `docs/.vuepress` and `scripts/locale-labels.mjs`.

Run `npm run docs:check-locales` to check article coverage, source freshness, metadata, untranslated prose, and heading/code-block/image counts. Production builds run this check automatically.

The English travel pages also record `sourceDependenciesHash` for shared travel components and city/photo data. After changing that content, synchronize its English dictionary and refresh this hash with the exported `translationDependencyHash` helper in `scripts/check-locales.mjs`.

```sh
# start dev server
npm run docs:dev
# build for production
npm run docs:build
# preview production build in local
npm run docs:preview
# update vuepress and theme
npm run vp-update
```

## Deploy to GitHub Pages

The plume theme has been created with GitHub Actions: `.github/workflows/docs-deploy.yml`. You also need to make the following settings in the GitHub repository:

- [ ] `settings > Actions > General`, Scroll to the bottom of the page, under `Workflow permissions`, check `Read and write permissions`, and click the save button.

- [ ] `settings > Pages`, In `Build and deployment`, select `Deploy from a branch` for `Source`, choose `gh-pages` for `Branch`, and click the save button.
  (The `gh-pages` branch may not exist upon first creation. You can complete the above setup first, push the code to the main branch, wait for `github actions` to finish, and then proceed with the setup.)

- [ ] Modify the `base` option in `docs/.vuepress/config.ts`:
  - If you are planning to deploy to `https://<USERNAME>.github.io/`, you can skip this step as `base` defaults to `"/"`.
  - If you are planning to deploy to `https://<USERNAME>.github.io/<REPO>/`, meaning your repository URL is `https://github.com/<USERNAME>/<REPO>`, set `base` to `"/<REPO>/"`.

To customize a domain name, please refer to [Github Pages](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)

## Documents

- [vuepress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
