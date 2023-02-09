// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
  content: {
    highlight: {
      theme: {
        default: 'github-dark',
        dark: 'github-dark',
      },
      preload: [
        'php',
        'shell',
        'js',
        'yaml',
      ],
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  }
})
