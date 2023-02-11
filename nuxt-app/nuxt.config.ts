// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    highlight: {
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
      },
      // Available languages list on https://highlightjs.org/static/demo/
      preload: [
        'php',
        'bash',
        'shell',
        'yaml',
        'markdown',
        'ini',
        'json',
        'sql'
      ],
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  }
})
