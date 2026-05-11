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
      },
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
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;900&display=swap',
        },
      ],
    }
  },
  site: {
    url: 'https://mtuaillo.dev/',
    trailingSlash: true
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/css/twenty/main.css',
    '~/assets/css/custom.css',
  ],
  hooks: {
    'content:file:beforeInsert': (document) => {
      // Transformer les dates en objets Date pour tous les fichiers markdown
      if (document._extension === '.md') {
        if (document.createdAt && typeof document.createdAt === 'string') {
          document.createdAt = new Date(document.createdAt);
        }
      }
    }
  },
})
