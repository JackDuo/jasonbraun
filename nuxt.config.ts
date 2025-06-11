// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],
  
  app: {
    head: {
      script: [
        {
          src: 'https://kit.fontawesome.com/f5553d3254.js',
          crossorigin: 'anonymous'
        }
      ]
    },
  },

  ssr: false,       // falls du nur statisches SPA willst
  
})

