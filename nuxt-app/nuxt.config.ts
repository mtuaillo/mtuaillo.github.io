// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/sitemap'],
  content: {
    documentDriven: true,
    highlight: {
      theme: 'rose-pine-dawn',
      // Available languages list on https://shiki.matsu.io/languages
      preload: [
        'php',
        'bash',
        'shell',
        'yaml',
        'makefile',
        'markdown',
        'ini',
        'json',
        'sql',
        'apache',
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
        { name: 'google-site-verification', content: 'GI7jdi0qTKSicCxuqE2jaObNWgEf6-eS9FdEYu95AyA' },
      ]
    }
  },
  css: [
    { src: '@fortawesome/fontawesome-free/css/fontawesome.css', lang: 'css' },
    { src: '@fortawesome/fontawesome-free/css/brands.css', lang: 'css' },
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
})