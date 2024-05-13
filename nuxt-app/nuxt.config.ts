// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    highlight: {
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
      },
      // Available languages list on https://highlightjs.readthedocs.io/en/latest/supported-languages.html
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
      ],
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  css: [
    { src: '@fortawesome/fontawesome-free/css/fontawesome.css', lang: 'css' }
  ]
})
