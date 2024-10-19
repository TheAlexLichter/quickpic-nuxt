export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  runtimeConfig: {
    public: {
      plausibleDomain: 'quickpic.lichter.io'
    }
  },

  // Proxy for Plausible
  routeRules: {
    '/v/js/script.js': {
      proxy: {
        to: 'https://plausible.lichter.io/js/script.js',
      }
    },
    '/v/api/event': {
      proxy: {
        to: 'https://plausible.lichter.io/api/event',
      }
    },
  },

  compatibilityDate: "2024-10-06",
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxt/scripts",
    'nuxt-og-image'
  ],
  tailwindcss: {
    cssPath: '~/assets/globals.css'
  }
})