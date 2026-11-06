import { createPage, type Plugin } from 'vuepress/core'
import { localeRedirects } from '../locale-redirects'

export function localeRedirectsPlugin(): Plugin {
  return {
    name: 'locale-redirects',
    async onInitialized(app) {
      for (const [path, target] of Object.entries(localeRedirects)) {
        app.pages.push(await createPage(app, {
          path,
          content: `[Continue to the article](${target}).`,
          frontmatter: {
            title: 'Article moved',
            lang: 'en-US',
            comment: false,
            search: false,
            sitemap: false,
            head: [
              ['meta', { 'http-equiv': 'refresh', content: `0;url=${target}` }],
              ['meta', { name: 'robots', content: 'noindex' }],
              ['link', { rel: 'canonical', href: `https://blog.jianzhihao.icu${target}` }],
            ],
          },
        }))
      }
    },
  }
}
