// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  compatibilityDate: '2024-12-16',
  modules: ['@kgierke/nuxt-basic-auth'],

  basicAuth: {
    enabled: true,
    users: [
      {
        username: "foo",
        password: "bar",
      }
    ]
  }
});