// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  googleFonts: {
    families: {
      Montserrat: true
    }
  },
  image: {
    domains: ['dummyjson.com']
  }
})