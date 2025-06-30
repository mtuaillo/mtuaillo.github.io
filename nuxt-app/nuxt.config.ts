// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Robots-Tag': 'index, follow',
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self' https:; connect-src 'self';"
        } 
      },
    }
  },
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/sitemap'],
  content: {
    documentDriven: true,
    highlight: {
      theme: 'rose-pine-dawn',
      // Available languages list on https://shiki.matsu.io/languages
      preload: [
        'apache',
        'ini',
        'json',
        'log',
        'makefile',
        'markdown',
        'php',
        'plsql',
        'regexp',
        'toml',
        'twig',
        'shell',
        'sql',
        'yaml',
      ],
    },
    markdown: {
      remarkPlugins: ['remark-reading-time'],
    },
    navigation: {
      fields: ['publishedAt', 'updatedAt'],
    }
  },
  app: {
    head: {
      meta: [
      ]
    }
  },
  site: {
    url: 'https://mtuaillo.dev/',
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/css/twenty/main.css',
    '~/assets/css/custom.css',
  ],
})