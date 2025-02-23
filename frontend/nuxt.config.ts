export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  app: {
    head: {
      link: [
        { 
          rel: 'icon', 
          type: 'image/svg+xml',
          href: '/images/favicon.svg' 
        }
      ]
    }
  },
  compatibilityDate: "2024-12-05",
})